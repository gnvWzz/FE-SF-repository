import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { error } from "jquery";
// import { fakeLogin } from "../redux/action";

function Login() {
  const REGEX = {
    //username có ít nhất 8 kí tự dài nhất 20 kí tự, không có các dấu chấm . _ ở đầu tên giữa và cuối tên
    usernameRegex: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //email tuân theo RFC 2822
    passwordRegex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [msgError, setmsgError] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  const text = "text";

  const handleSubmit = () => {

    axios({
      url: `http://localhost:8080/api/account/login`,
      method: "POST",
      responseType: "json",
      contentType: "application/json",
      data: form,
    })
      .then(function (response) {
        console.log("status" + response.status);
        console.log("data" + response.data);
        if (response.data !== "") {
          localStorage.setItem("token", response.data.token);

          localStorage.setItem("username", response.data.username);
        }
      })
      .catch(function (err) {
        alert("Sai thông tin đăng nhập!");
        console.log(err.response);
      });

    if (localStorage.getItem("token") !== "") {
      navigate(`/`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
                    Don’t have an account?{" "}
                    <a href="/signup">Create a free account</a>
                  </p>
                </div>
                <Formik
                  initialValues={form}
                  // validate={handleValidate}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <form method="post" onSubmit={handleSubmit}>
                      <div
                        class="form-group mb-4"
                        className={`custom-input ${
                          errors.username ? "custom-input-error" : ""
                        }`}
                      >
                        <label for="#">Enter username</label>
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Enter Username"
                          name="username"
                          value={form.username || ""}
                          onChange={handleChange}
                        />
                        {errors.username && touched.username ? (
                          <p className="error">{msgError.username}</p>
                        ) : null}
                      </div>
                      <div
                        class="form-group"
                        className={`custom-input ${
                          errors.password ? "custom-input-error" : ""
                        }`}
                      >
                        <label for="#">Enter Password</label>
                        <a className="float-right" href="">
                          Forget password?
                        </a>
                        <Field
                          type="password"
                          className="form-control"
                          placeholder="Enter Password"
                          name="password"
                          value={form.password || ""}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password ? (
                          <p className="error">{msgError.password}</p>
                        ) : null}
                      </div>
                      <div>
                        {msgError.confirm !== "" ? (
                          <p className="error">{msgError.confirm}</p>
                        ) : null}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-main mt-3 btn-block"
                      >
                        Login
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
