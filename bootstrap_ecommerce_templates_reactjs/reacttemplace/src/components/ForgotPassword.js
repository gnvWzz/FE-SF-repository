function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  <h3 className="mb-2 h2">Password Recovery</h3>
                  <p className="lead">
                    Please enter the email address for your account. A
                    verification code will be sent to you. Once you have
                    received the verification code, you will be able to choose a
                    new password for your account.
                  </p>
                </div>

                <form action="#">
                  <div className="form-group mb-4">
                    <label for="#">Enter Email Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <a href="#" className="btn btn-main mt-3 btn-block">
                    Request OTP
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
