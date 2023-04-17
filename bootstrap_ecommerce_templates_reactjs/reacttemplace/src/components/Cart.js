import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CART_URL } from "./URLS/url";

function Cart() {
  const navigate = useNavigate();

  let isStop = false;

  let isStop1 = false;

  let { state } = useLocation();

  const cart_url = CART_URL;

  const [cart, setCarTemp] = useState([]);

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
        setCarTemp(res.data);
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
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    if (state !== null) {
      let temp = {
        accountName: localStorage.getItem("username"),
        cartDetailDtos: [
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
      }, 1000);
    }
    return () => {
      isStop = true;
    };
  }, []);

  const temp_list = [];

  let Isdelete = false;

  const [cursorProductCard, setCursorProductCard] = useState("");

  if (cart.length === 0) {
    return (
      <>
        <p style={{ textAlign: "center" }}>Khong co san pham nao het</p>
      </>
    );
  } else {
    const map = (list) => {
      for (let i = 0; i < list.cartDetailModelList.length; i++) {
        temp_list.push(list.cartDetailModelList[i]);
      }
    };

    const handleCheckout = () =>{
      navigate("/checkout", {state : { temp_list, cart}});
    }

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
                <button type="button" onClick={handleCheckout} className="btn btn-main btn-small"
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

    const handleUpdate = () => {};

    const handleChangeQuantity = () => {};

    return (
      <div className="checkout-container">
        <section className="cart shopping page-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="product-list">
                  <form className="cart-form">
                    <table
                      className="table table-primary shop_table shop_table_responsive cart"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th className="product-thumbnail"> </th>
                          <th className="product-name">Product</th>
                          <th className="product-price">Price</th>
                          <th>Size</th>
                          <th>Color</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-subtotal">SubTotal</th>
                          <th className="product-remove"> </th>
                        </tr>
                      </thead>

                      <tbody>
                        {map(cart)}
                        {temp_list.map((i, index) => (
                          <tr className="cart_item">
                            <td>
                              <a href="/product-single">
                                <img
                                  src={
                                    JSON.parse(i.size_color_img_quantity).img[0]
                                  }
                                  className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                  alt=""
                                />
                              </a>
                            </td>
                            <td className="product-name" data-title="Product">
                              <a href="#" style={{ fontSize: "20px" }}>
                                {i.name}
                              </a>
                            </td>
                            <td data-title="Total">
                              <span className="amount">
                                <span className="currencySymbol">
                                  <p style={{ fontSize: "20px" }}>{i.price}</p>
                                </span>
                              </span>
                            </td>
                            <td>
                              <p style={{ fontSize: "20px" }}>
                                {JSON.parse(i.size_color_img_quantity).size}
                              </p>
                            </td>
                            <td>
                              <p style={{ fontSize: "20px" }}>
                                {JSON.parse(i.size_color_img_quantity).color}
                              </p>
                            </td>
                            <td>
                              <p style={{ fontSize: "20px" }}>
                                {/* <input
                                  style={{ fontSize: "20px" }}
                                  value={i.quantity}
                                  type="number"
                                  id="qty"
                                  step="1"
                                  min="0"
                                  max="10"
                                  title="Qty"
                                  size="2"
                                /> */}
                                {i.quantity}
                              </p>
                            </td>
                            <td data-title="Total">
                              <p style={{ fontSize: "20px" }}>{i.subTotal}</p>
                            </td>
                            <td data-title="Remove">
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
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
