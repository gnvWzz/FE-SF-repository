function SignUp() {
    return (
        <div className="signUp-container">
            <div class="account section">
                <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                    <div class="login-form border p-5">
                        <div class="text-center heading">
                        <h2 class="mb-2">Sign Up</h2>
                        <p class="lead">Already have an account? <a href="/login"> Login now</a></p>
                        </div>
            
                        <form action="#">
                        <div class="form-group mb-4">
                            <label for="#">Enter Email Address</label>
                            <input type="text" class="form-control" placeholder="Enter Email Address"/>
                        </div>
                        <div class="form-group mb-4">
                            <label for="#">Enter username</label>
                            <a class="float-right" href="">Forget password?</a>
                            <input type="text" class="form-control" placeholder="Enter Password"/> 
                        </div>
                        <div class="form-group mb-4">
                            <label for="#">Enter Password</label>
                            <input type="text" class="form-control" placeholder="Enter Password"/> 
                        </div>
                        <div class="form-group">
                            <label for="#">Confirm Password</label>
                            <input type="text" class="form-control" placeholder="Confirm Password" /> 
                        </div>
            
                        <a href="#" class="btn btn-main mt-3 btn-block">Signup</a>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp