function Login() {
  return (
    <div className="login-container">
      <div class="account section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="login-form border p-5">
                <div class="text-center heading">
                  <h2 class="mb-2">Login</h2>
                  <p class="lead">
                    Don’t have an account? <a href="#">Create a free account</a>
                  </p>
                </div>

                <form action="#">
                  <div class="form-group mb-4">
                    <label for="#">Enter username</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Username"
                    />
                  </div>
                  <div class="form-group">
                    <label for="#">Enter Password</label>
                    <a class="float-right" href="">
                      Forget password?
                    </a>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Password"
                    />
                  </div>

                  <a href="#" class="btn btn-main mt-3 btn-block">
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
