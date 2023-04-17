import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Checkout() {
  let { state } = useLocation();

  if (localStorage.getItem("username") !== null) {
    const cart_detail = state.temp_list;

    const cart = state.cart;

    return (
      <div className="checkout-container">
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
                          <div className="form-group mb-4">
                            <label for="first_name">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="first_name"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mb-4">
                            <label for="last_name">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="last_name"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label for="company_name">Country</label>
                            <select className="form-control">
                              <option value="">Select an Option</option>
                              <option value="January">January</option>
                              <option value="February">February</option>
                              <option value="March">March</option>
                              <option value="April">April</option>
                              <option value="May">May</option>
                              <option value="June">June</option>
                              <option value="July">July</option>
                              <option value="August">August</option>
                              <option value="September">September</option>
                              <option value="October">October</option>
                              <option value="November">November</option>
                              <option value="December">December</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label for="first_name">Street Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="street"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label for="first_name">Town / City </label>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              placeholder="Apartment"
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label for="company_name">District </label>
                            <select className="form-control">
                              <option value="">Select an Option</option>
                              <option value="January">January</option>
                              <option value="February">February</option>
                              <option value="March">March</option>
                              <option value="April">April</option>
                              <option value="May">May</option>
                              <option value="June">June</option>
                              <option value="July">July</option>
                              <option value="August">August</option>
                              <option value="September">September</option>
                              <option value="October">October</option>
                              <option value="November">November</option>
                              <option value="December">December</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label for="first_name">Phone </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label for="first_name">Email address </label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              placeholder=""
                            />
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

                    {cart_detail.map((cart, index) => (
                      <div className="media product-card">
                        <p>{cart.name}</p>
                        <div className="media-body text-right">
                          <p className="h5">
                            {cart.quantity} x {cart.price} VND
                          </p>
                        </div>
                      </div>
                    ))}

                    <ul className="summary-prices list-unstyled mb-4">
                      <li className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span className="h5">{cart.totalPrice} VND</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span>Shipping:</span>
                        <span className="h5">Free</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span>Total</span>
                        <span className="h5">{cart.totalPrice} VND</span>
                      </li>
                    </ul>

                    <h3 style={{ textAlign: "center" }}>DISCOUNT CODE</h3>

                    <div style={{ textAlign: "center" }}>
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder=""
                      />
                      <button
                        href="/checkout"
                        className="mt-3 btn btn-main btn-small"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="info mt-4 border-top pt-4 mb-5">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <a href="#">privacy policy</a>.
                    </div>
                    <button href="/checkout" className="btn btn-main btn-small">
                      Check out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <p style={{ textAlign: "center" }}>Ban chua dang nhap</p>;
  }
}
export default Checkout;
