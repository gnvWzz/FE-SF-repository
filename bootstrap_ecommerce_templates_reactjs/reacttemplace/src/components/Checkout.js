import axios from "axios";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ACCOUNT_URL, ORDER_URL } from "./URLS/url";

function Checkout({ provinces }) {
  let { state } = useLocation();

  const Order_url = ORDER_URL;

  const navigate = useNavigate();

  const loginName = localStorage.getItem("username");

  const user_url = ACCOUNT_URL;

  const [form, setForm] = useState({});

  useEffect(() => {
    axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      url: `${user_url}/user/${loginName}`,
      method: "GET",
    })
      .then((res) => {
        if (res.data !== null) {
          setForm(res.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const REGEX = {
    //email tuân theo RFC 2822
    emailRegex:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,

    phoneRegex: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
  };

  const [msgError, setMsgError] = useState({
    first_name: "",
    last_name: "",
    city: "",
    street_address: "",
    district: "",
    phone: "",
    email: "",
  });

  if (localStorage.getItem("username") !== null) {
    const cart_detail = state.cart;

    const cart = state.cart;

    const handleChangeOrder = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmitOrder = (e) => {
      const isFilled =
        form.firstName &&
        form.lastName &&
        form.street &&
        form.district &&
        form.phone &&
        form.email;
      if (isFilled) {
        // console.log(form);
        place_order(form);
      } else {
        alert("Please fill out the fields");
      }
    };

    console.log(state.cart.cartDetailModelList);
    const place_order = async (e) => {
      if (state.cart.cartDetailModelList === 0) {
        <p>Loading</p>;
      } else {
        form.orderDetails = state.cart.cartDetailModelList;
        await axios({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          url: `${Order_url}?username=${localStorage.getItem("username")}`,
          method: "POST",
          data: form,
        })
          .then((res) => {
            if (res.status === 200) {
              alert("Place order successfully");
              navigate("/");
            } 
          })
          .catch((err) => {
            alert("Out of stock of "  + err.response.data)
          });
      }
    };

    const formatCurrency = (currency) => {
      let intCurrency = currency;
      const format = intCurrency
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return format;
    };

    const handleValidateOrder = async () => {
      const errors = {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        city: "",
        street_address: "",
        district: "",
      };

      if (!form.city) {
        errors.city = "Required";
      }

      if (!form.firstName) {
        errors.first_name = "Required";
      }
      if (!form.lastName) {
        errors.last_name = "Required";
      }
      if (!form.phone) {
        errors.phone = "Required";
      }
      if (!form.street) {
        errors.street_address = "Required";
      }
      if (!form.email) {
        errors.email = "Required";
      }
      if (!form.district) {
        errors.district = "Required";
      }
      setMsgError(errors);
      return errors;
    };

    const handleDiscountOrder = (e) => {
      alert("OK");
    };

    return (
      <div className="checkout-container">
        <Formik initialValues={form} validate={handleValidateOrder}>
          {({ errors, touched }) => (
            <div className="page-wrapper">
              <div className="checkout shopping">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-7 pr-5">
                      <div className="billing-details">
                        <h4 className="mb-4">Billing Details</h4>

                        <form className="checkout-form">
                          <div className="row">
                            <div className="col-lg-6">
                              <div
                                class="form-group mb-4"
                                className={`custom-input ${
                                  errors.first_name
                                    ? "form-group mb-4 custom-input-error"
                                    : "form-group mb-4"
                                }`}
                              >
                                <label for="#"> First Name</label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="firstName"
                                  value={form.firstName || ""}
                                  placeholder="Enter Your First Name"
                                  onChange={handleChangeOrder}
                                />
                                {errors.first_name && touched.first_name ? (
                                  <p className="error">{errors.first_name}</p>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div
                                class="form-group mb-4"
                                className={`custom-input ${
                                  errors.last_name
                                    ? "form-group mb-4 custom-input-error"
                                    : "form-group mb-4"
                                }`}
                              >
                                <label for="#"> Last Name</label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="lastName"
                                  value={form.lastName || ""}
                                  placeholder="Enter Your Last Name"
                                  onChange={handleChangeOrder}
                                />
                                {errors.last_name && touched.last_name ? (
                                  <p className="error">{errors.last_name}</p>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-4">
                                <label for="company_name">Provinces</label>

                                <select
                                  name="city"
                                  className="form-control"
                                  onChange={handleChangeOrder}
                                >
                                  <option value="">Select an Option</option>
                                  {provinces.map((province, index) => (
                                    <option value={province.name}>
                                      {province.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div
                                class="form-group mb-4"
                                className={`custom-input ${
                                  errors.district
                                    ? "form-group mb-4 custom-input-error"
                                    : "form-group mb-4"
                                }`}
                              >
                                <label for="#"> District</label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="district"
                                  value={form.district || ""}
                                  placeholder="Enter Your District"
                                  onChange={handleChangeOrder}
                                />
                                {errors.district && touched.district ? (
                                  <p className="error">{errors.district}</p>
                                ) : null}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div
                                class="form-group mb-4"
                                className={`custom-input ${
                                  errors.street_address
                                    ? "form-group mb-4 custom-input-error"
                                    : "form-group mb-4"
                                }`}
                              >
                                <label for="#"> Street Address</label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="street"
                                  value={form.street || ""}
                                  placeholder="Enter Your Street Address"
                                  onChange={handleChangeOrder}
                                />
                                {errors.street_address &&
                                touched.street_address ? (
                                  <p className="error">
                                    {errors.street_address}
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div
                                class="form-group mb-4"
                                className={`custom-input ${
                                  errors.phone
                                    ? "form-group mb-4 custom-input-error"
                                    : "form-group mb-4"
                                }`}
                              >
                                <label for="#"> Phone</label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="phone"
                                  value={form.phone || ""}
                                  placeholder="Enter Your Phone"
                                  onChange={handleChangeOrder}
                                />
                                {errors.phone && touched.phone ? (
                                  <p className="error">{errors.phone}</p>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div
                                class="form-group mb-4"
                                className={`custom-input ${
                                  errors.email
                                    ? "form-group mb-4 custom-input-error"
                                    : "form-group mb-4"
                                }`}
                              >
                                <label for="#"> Email </label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  name="email"
                                  value={form.email || ""}
                                  placeholder="Enter Your Email"
                                  onChange={handleChangeOrder}
                                  readOnly
                                />
                                {errors.email && touched.email ? (
                                  <p className="error">{errors.email}</p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-5">
                      <div className="product-checkout-details mt-5 mt-lg-0">
                        <div className="mb-4 border-bottom pb-4">
                          <h3>Order Summary</h3>
                          <div style={{ textAlign: "center" }}>
                            <Link
                              style={{ fontSize: "18px" }}
                              to={{ pathname: "/cart" }}
                            >
                              Go to cart
                            </Link>
                          </div>
                        </div>

                        {cart.cartDetailModelList.map((cart, index) => (
                          <div className="media product-card">
                            <p>
                              {cart.name} {cart.serialNumber}
                            </p>
                            <div className="media-body text-right">
                              <p className="h5">
                                {cart.quantity} x {formatCurrency(cart.price)}{" "}
                                VND
                              </p>
                            </div>
                          </div>
                        ))}

                        <ul className="summary-prices list-unstyled mb-4">
                          <li className="d-flex justify-content-between">
                            <span>Subtotal:</span>
                            <span className="h5">
                              {formatCurrency(cart.totalPrice)} VND
                            </span>
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>Shipping:</span>
                            <span className="h5">Free</span>
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>Total</span>
                            <span className="h5">
                              {formatCurrency(cart.totalPrice)} VND
                            </span>
                          </li>
                        </ul>
                        <h3 style={{ textAlign: "center" }}>DISCOUNT CODE</h3>
                        <div className="container">
                          <div className="row">
                            <div className="col-10">
                              <div style={{ textAlign: "center" }}>
                                <input
                                  type="text"
                                  className="form-control mt-1"
                                  id="first_name"
                                  placeholder=""
                                />
                              </div>
                            </div>
                            <div className="col-2">
                              <button
                                onClick={handleDiscountOrder}
                                className="btn btn-main btn-small"
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="info mt-4 border-top pt-4 mb-5">
                          Your personal data will be used to process your order,
                          support your experience throughout this website, and
                          for other purposes described in our{" "}
                          <a href="#">privacy policy</a>.
                        </div>
                        <button
                          onClick={handleSubmitOrder}
                          className="btn btn-main btn-small"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    );
  } else {
    <p style={{ textAlign: "center" }}>Ban chua dang nhap</p>;
  }
}
export default Checkout;
