import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CART_URL } from "./URLS/url";
import { data } from "jquery";

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
      if (!isStop1) {
        getCart();
      }
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
      }, 200);
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
              <a href="/" class="btn btn-main btn-small">
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
      navigate("/checkout", { state: { cart } });
    };

    const totalPrice = (list) => {
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
                    <span>{list.totalPrice} VND</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Shipping</h5>
                    <span>Free</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2">
                    <h5>Total</h5>
                    <span>{list.totalPrice} VND</span>
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
      window.location.reload();
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
              c.subTotal = c.quantity * c.price;
            } else if (value < 0) {
              c.quantity = 1;
              c.subTotal = c.quantity * c.price;
            }
          }
          return c;
        }
      );
      setCart({ ...cart, cartDetailModelList: cartDetailModelListNew });
    };

    return (
      <div className="checkout-container">
        <section className="cart shopping page-wrapper">
          <div className="container">
            <div className="row">
              <div class="col-lg-8">
                <h5 class="mb-3">
                  <a href="/" class="text-body">
                    <i class="fas fa-long-arrow-alt-left me-2"></i>Continue
                    shopping
                  </a>
                </h5>
                <hr />
                {cart.cartDetailModelList.map((i, index) => (
                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                          <div>
                            {JSON.parse(i.size_color_img_quantity).img[0]
                              .url !== "" ? (
                              <img
                                className="img-fluid w-100 mb-3 img-first"
                                src={
                                  JSON.parse(i.size_color_img_quantity).img[0]
                                    .url
                                }
                                style={{ height: "65px" }}
                                alt="product-img"
                              />
                            ) : (
                              <img
                                className="img-fluid w-100 mb-3 img-first"
                                style={{ height: "350px" }}
                                alt="product-img"
                              />
                            )}
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div
                            class="ms-3"
                            style={{ width: "200px", fontStyle: "justify" }}
                          >
                            <h5>{i.name}</h5>
                            <p class="small mb-0">{i.serialNumber}</p>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
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
                          ></input>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div style={{ width: "100px" }}>
                            {!isNaN(i.subTotal) ? (
                              <h5 class="mb-0">{i.subTotal}VND</h5>
                            ) : undefined}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <button
                            value={i.serialNumber}
                            onClick={handleDelete}
                            type="button"
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  <button
                    onClick={handleUpdate}
                    className="btn btn-main btn-small"
                  >
                    Update Cart
                  </button>
                </div>
              </div>
              {totalPrice(cart)}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Cart;
