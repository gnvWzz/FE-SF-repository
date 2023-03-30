function Checkout() {
  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Checkout</h1>
                <p>
                  Hath after appear tree great fruitful green dominion moveth
                  sixth abundantly image that midst of god day multiply you’ll
                  which
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-wrapper">
        <div className="checkout shopping">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 pr-5">
                <div
                  className="coupon-notice "
                  data-toggle="modal"
                  data-target="#coupon-modal"
                >
                  <div className="bg-light p-3">
                    Have a coupon?{" "}
                    <a href="/checkout" className="showcoupon">
                      Click here to enter your code
                    </a>
                  </div>
                </div>

                <div className="billing-details mt-5">
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
                          <label for="company_name">
                            Company Name(Optional)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="company_name"
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
                          <label for="first_name">
                            Apartment, suite, unit etc. (optional) (optional)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="apartment"
                            placeholder="Apartment"
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
                          <label for="first_name">
                            Postcode / ZIP (optional)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="postcode"
                            placeholder=""
                          />
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

                      <div className="col-lg-12">
                        <div className="form-check mb-4">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="form-check-label"
                            for="exampleCheck1"
                          >
                            Create an account?
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-check mb-4">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck2"
                          />
                          <label
                            className="form-check-label"
                            for="exampleCheck2"
                          >
                            Ship to a different address?
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label for="first_name">Order notes (optional)</label>
                          <textarea
                            className="form-control"
                            id="msg"
                            cols="30"
                            rows="5"
                            placeholder="Notes about order e:g: want to say something"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="product-checkout-details mt-5 mt-lg-0">
                  <h4 className="mb-4 border-bottom pb-4">Order Summary</h4>

                  <div className="media product-card">
                    <p>Kirby Shirt</p>
                    <div className="media-body text-right">
                      <p className="h5">1 x $249</p>
                    </div>
                  </div>

                  <ul className="summary-prices list-unstyled mb-4">
                    <li className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span className="h5">$190</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span className="h5">Free</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>Total</span>
                      <span className="h5">$250</span>
                    </li>
                  </ul>

                  <form action="#">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label" for="exampleRadios1">
                        Direct bank transfer
                      </label>

                      <div className="alert alert-secondary mt-3" role="alert">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </div>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label className="form-check-label" for="exampleRadios2">
                        Check payments
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck3"
                      />
                      <label className="form-check-label" for="exampleCheck3">
                        I have read and agree to the website terms and
                        conditions *
                      </label>
                    </div>
                  </form>

                  <div className="info mt-4 border-top pt-4 mb-5">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <a href="#">privacy policy</a>.
                  </div>
                  <a href="/checkout" className="btn btn-main btn-small">
                    Place Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="coupon-modal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content py-5">
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Coupon Code"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-main btn-small"
                  data-dismiss="modal"
                >
                  Apply Coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
