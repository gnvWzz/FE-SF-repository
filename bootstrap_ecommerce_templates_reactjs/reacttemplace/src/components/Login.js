function Login() {
  return (
    <div className="login-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  <h2 className="mb-2">Login</h2>
                  <p className="lead">
                    Don’t have an account? <a href="#">Create a free account</a>
                  </p>
                </div>

                <form action="#">
                  <div className="form-group mb-4">
                    <label for="#">Enter username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Username"
                    />
                  </div>
                  <div className="form-group">
                    <label for="#">Enter Password</label>
                    <a className="float-right" href="">
                      Forget password?
                    </a>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Password"
                    />
                  </div>

                  <a href="#" className="btn btn-main mt-3 btn-block">
                    Login
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
export default Login;
