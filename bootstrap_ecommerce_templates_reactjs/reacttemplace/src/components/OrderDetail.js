import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ORDER_URL } from "./URLS/url";

export default function OrderDetails() {
  const navigate = useNavigate();
  const name = localStorage.getItem("username");
  let { state } = useLocation();
  const [orderDetails, setOrderDetails] = useState([]);
  let isStop = false;
  const url = ORDER_URL;
  const [cursor, setCursor] = useState("");

  const formatCurrency = (currency) => {
    let intCurrency = currency;
    const format = intCurrency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return format;
  };

  useEffect(() => {
    if (!isStop) {
      axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${url}/orderDetails/${state.value}`,
        method: "GET",
      })
        .then((res) => {
          setOrderDetails(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }

    return () => {
      isStop = true;
    };
  }, []);

  const handleCursorOver = (e) => {
    setCursor("pointer");
  };

  const handleNavigateToProductDetail = (e) => {
    navigate(`/single-product/${e.currentTarget.getAttribute("value")}`)
  }

  const handleDetails = () => {
    return orderDetails.map((orderDetails) => (
      <div class="card-body">
        <div class="row">
          <div class="col-md-2">
            {orderDetails.size_color_img_quantity !== null ? (
              <img
                src={
                  JSON.parse(orderDetails.size_color_img_quantity).img[0].url
                }
                class="img-fluid"
                alt="product-img"
                onClick={() => navigate(`/single-product/${orderDetails.name}`)}
                style={{ cursor: cursor }}
                onMouseOver={handleCursorOver}
              />
            ) : (
              <img
                src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                class="img-fluid"
                alt="product-img"
                style={{ cursor: cursor }}
                onMouseOver={handleCursorOver}
              />
            )}
          </div>
          <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
            <button class="product-name-navigate mb-0" onClick={handleNavigateToProductDetail} value={orderDetails.name}>{orderDetails.name}</button>
          </div>
          <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
            <p class=" mb-0 small">{formatCurrency(orderDetails.price)}</p>
          </div>

          <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
            <p class=" mb-0 small">Qty:{orderDetails.quantity}</p>
          </div>
          <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
            <p class=" mb-0 small">{formatCurrency(orderDetails.subTotal)}</p>
          </div>
        </div>
        <hr class="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
      </div>
    ));
  };

  return (
    <section class="h-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-10 col-xl-8">
            <div class="card" style={{ borderRadius: "10px" }}>
              <div class="card-header px-4 py-5">
                <h5 class="text-muted mb-0">
                  Thanks for your Order,{" "}
                  <span className="customer-name">{name}</span>!
                </h5>
              </div>
              <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <p class="lead fw-normal mb-0" style={{ color: "#fb5c42" }}>
                    Order Details
                  </p>
                </div>

                <div class="card shadow-0 border mb-4">{handleDetails()}</div>



                <div class="d-flex justify-content-between pt-2">
                  <p class="text-muted mb-0">Invoice Number : 788152</p>
                  <p class="text-muted mb-0">
                    <span class="fw-bold me-4">Discount</span> $19.00
                  </p>
                </div>

                <div class="d-flex justify-content-between">
                  <p class="text-muted mb-0">Invoice Date : {state.date}</p>
                  <p class="text-muted mb-0">
                    <span class="fw-bold me-4">GST 18%</span> 123
                  </p>
                </div>

                <div class="d-flex justify-content-between mb-5">
                  <p class="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                  <p class="text-muted mb-0">
                    <span class="fw-bold me-4">Delivery Charges</span> Free
                  </p>
                </div>
              </div>
              <div
                class="card-footer border-0 px-4 py-5"
                style={{
                  backgroundColor: "#a8729a",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                  {" "}
                  Total paid:{" "}
                  <span class="h2 mb-0 ms-2 ml-3">
                    {formatCurrency(state.totalPrice)} VND
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
