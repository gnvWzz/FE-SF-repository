import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CART_URL } from "./URLS/url";
import { data } from "jquery";
import { faL } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const navigate = useNavigate();

  let isStop = false;

  let isStop1 = false;

  let { state } = useLocation();

  const cart_url = CART_URL;

  const [checkEmpty, setCheckEmpty] = useState(true);

  const [cart, setCart] = useState([]);

  // LAY CART KHI CO TOKEN VA ACCOUNT NAME=============================
  useEffect(() => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("username") !== null
    ) {
      // Long xoa localStorage cua Long
      localStorage.removeItem("sort_price");
      localStorage.removeItem("sort_name");
      localStorage.removeItem("min_price");
      localStorage.removeItem("max_price");
      //
      if (!isStop1) {
        getCart();
      }
    } else {
      navigate("/login");
    }
    return () => {
      isStop1 = true;
    };
  }, []);
  // ===========================================================

  // LAY CART THONG QUA AXIOS KHI CO TOKEN VA ACCOUNT NAME========
  const getCart = async () => {
    await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      url: `${cart_url}?account-name=${localStorage.getItem("username")}`,
      method: "GET",
    })
      .then((res) => {
        setCart(res.data);
        if (res.data === "Fail") {
          setCheckEmpty(false);
        }
        localStorage.setItem("quantity", res.data.cartDetailModelList.length);
      })
      .catch((err) => {
        console.log("Khong co du lieu");
      });
  };
  // ===============================================

  const add_to_cart = async (temp) => {
    await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      url: `${cart_url}/add-to-cart`,
      method: "POST",
      data: temp,
    })
      .then((res) => {})
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    if (state !== null) {
      let temp = {
        accountName: localStorage.getItem("username"),
        cartDetailModelList: [
          {
            price: state.price,
            quantity: state.quantity,
            serialNumber: state.serialNumber,
          },
        ],
      };

      if (!isStop) {
        add_to_cart(temp);
      }
      window.history.replaceState({}, document.title);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
    return () => {
      isStop = true;
    };
  }, []);

  const [temp_list, setTempList] = useState([]);

  let Isdelete = false;

  const [cursorProductCard, setCursorProductCard] = useState("");

  if (cart.length === 0) {
    return (
      <>
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      </>
    );
  } else if (checkEmpty === false || cart.cartDetailModelList.length === 0) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="offset-lg-3 col-lg-6 col-md-12 col-12 text-center">
              <img
                src="https://codescandy.com/coach/rtl/assets/images/bag.svg"
                alt="bag.svg"
              />
              <h2>Your shopping cart is empty</h2>
              <a href="/" className="btn btn-main btn-small">
                Back home
              </a>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    const map = (list) => {};

    const handleCheckout = () => {
      let check = false;
      cart.cartDetailModelList.map((i, index) => {
        if (i.quantity === 0) {
          check = true;
        }
      });
      if (check === true) {
        alert("Cart item quantity can not equal to 0");
      } else {
        navigate("/checkout", { state: { cart } });
      }
    };

    const formatCurrency = (currency) => {
      let intCurrency = currency;
      const format = intCurrency
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return format;
    };

    const totalPrice = () => {
      if (cart.length === 0) {
        <p>Loading</p>;
      } else {
        return (
          <>
            <div className="col-lg-4">
              <div className="cart-info card p-4 mt-4">
                <h4 className="mb-4">Cart totals</h4>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Subtotal</h5>
                    {cart.totalPrice !== "" ? (
                      <span>{formatCurrency(cart.totalPrice)} VND</span>
                    ) : (
                      <span>No totalPrice </span>
                    )}
                  </li>
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Shipping</h5>
                    <span>Free</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2">
                    <h5>Total</h5>
                    {cart.totalPrice !== "" ? (
                      <span>{formatCurrency(cart.totalPrice)} VND</span>
                    ) : (
                      <span>No totalPrice</span>
                    )}
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="btn btn-main btn-small"
                >
                  Process to checkout
                </button>
              </div>
            </div>
          </>
        );
      }
    };

    const handleDelete = async (e) => {
      const json = {
        accountName: localStorage.getItem("username"),
        serialNumber: e.currentTarget.getAttribute("value"),
      };
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        url: `${cart_url}/cartItem`,
        method: "DELETE",
        data: json,
      });
      setTimeout(() => {
        window.location.reload();
      }, 200);
    };

    const handleCursorProductCard = function () {
      setCursorProductCard("pointer");
    };

    const handleUpdate = (e) => {
      let totalNew = 0;
      cart.cartDetailModelList.map((c, index) => {
        totalNew = totalNew + c.subTotal;
        return totalNew;
      });
      setCart({ ...cart, totalPrice: totalNew });
      updateCartByAxios();
    };

    const updateCartByAxios = async (e) => {
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${cart_url}`,
        method: "PUT",
        data: cart,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          throw err;
        });
    };

    const handleChangeQuantity = (value, index) => {
      const stock = JSON.parse(
        cart.cartDetailModelList[index].size_color_img_quantity
      ).quantity;
      const cartDetailModelListNew = cart.cartDetailModelList.map(
        (c, indexC) => {
          if (indexC === index) {
            if (value > stock) {
              c.quantity = stock;
            } else if (value <= stock && value >= 0) {
              c.quantity = parseInt(value);
            } else if (value < 0) {
              c.quantity = 1;
            }
          }
          return c;
        }
      );
      setCart({ ...cart, cartDetailModelList: cartDetailModelListNew });
    };

    const handleBlur = async () => {
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${cart_url}`,
        method: "PUT",
        data: cart,
      })
        .then((res) => {})
        .catch((err) => {
          throw err;
        });
      setTimeout(() => {
        window.location.reload();
      }, 200);
    };

    const handleNavigateContinueShopping = (e) => {
      if (localStorage.getItem("category") !== null) {
        navigate(`/shop/${localStorage.getItem("category")}`);
      } else {
        navigate("/");
      }
    };

    return (
      <div className="checkout-container">
        <section className="cart shopping page-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <h5 className="mb-3">
                  <button
                    onClick={handleNavigateContinueShopping}
                    className="btn btn-main btn-small"
                  >
                    <i className="fas fa-long-arrow-alt-left me-2"></i>Continue
                    shopping
                  </button>
                </h5>
                <hr />
                {cart.cartDetailModelList.map((i, index) => (
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <div>
                            {JSON.parse(i.size_color_img_quantity).img
                              .length !== 0 ? (
                              <img
                                className="img-fluid w-100 mb-3 img-first"
                                src={
                                  JSON.parse(i.size_color_img_quantity).img[0]
                                    .url
                                }
                                style={{ height: "65px", width: "100px" }}
                                alt="product-img"
                              />
                            ) : (
                              <img
                                className="img-fluid w-100 mb-3 img-first"
                                src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                style={{ height: "65px", width: "100px" }}
                                alt="product-img"
                              />
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <div
                            className="ms-3"
                            style={{ width: "130px", fontStyle: "justify" }}
                          >
                            {" "}
                            {i.name !== "" ? (
                              <h5>{i.name}</h5>
                            ) : (
                              <h5>No name</h5>
                            )}
                            {i.serialNumber !== "" ? (
                              <p className="small mb-0">{i.serialNumber}</p>
                            ) : (
                              <p className="small mb-0">No serialNumber</p>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          {i.quantity !== "" ? (
                            <input
                              type="number"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              style={{ width: 100, textAlign: "center" }}
                              value={i.quantity}
                              a-key={index}
                              onChange={(e) =>
                                handleChangeQuantity(e.target.value, index)
                              }
                              onBlur={(e) =>
                                handleBlur(e.target.value, i.serialNumber)
                              }
                            ></input>
                          ) : (
                            <p>No quantity</p>
                          )}
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <div style={{ width: "150px" }}>
                            {!isNaN(i.subTotal) ? (
                              <h5 className="mb-0">
                                {formatCurrency(i.subTotal)}VND
                              </h5>
                            ) : undefined}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          {i.serialNumber !== "" ? (
                            <button
                              value={i.serialNumber}
                              onClick={handleDelete}
                              type="button"
                              style={{ borderRadius: "50%", border: "none" }}
                            >
                              <i
                                id="deleteBox"
                                className="tf-ion-trash-b"
                                onMouseOver={handleCursorProductCard}
                                style={{
                                  cursor: cursorProductCard,
                                  fontSize: "20px",
                                }}
                              ></i>
                            </button>
                          ) : (
                            <p>No serialNumber</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalPrice()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Cart;
