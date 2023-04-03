import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const REGEX = {
    //username có ít nhất 8 kí tự dài nhất 20 kí tự, không có các dấu chấm . _ ở đầu tên giữa và cuối tên
    usernameRegex: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //email tuân theo RFC 2822
    passwordRegex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [msgError, setmsgError] = useState({
    username: "",
    password: "",
  });

  function handleSubmit() {
    const isFilled =
      form.username && form.password ;

    const isError =
      isFilled &&
      (
        msgError.username ||
        msgError.password
      );

    if (isFilled && !isError) {
      axios
        .post(`http://localhost:8080/api/signup/account`, form)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          throw err;
        });

      alert("Đăng kí thành công! ");
      navigate(`/login`);
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleValidate() {
    const errors = {
      username: "",
      password: "",
    };

    if (!form.username) {
      errors.username = "Bắt buộc";
    } 
    

    if (!form.password) {
      errors.password = "Bắt buộc";
    } 
    

    setmsgError(errors);
    return errors;
  }

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
                <Formik
                  initialValues={form}
                  validate={handleValidate}
                  onSubmit={handleSubmit}
                >
                  {({errors, touched}) =>(
                    <form onSubmit={handleSubmit}>
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
                        <p className="error">{errors.username}</p>
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
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        value={form.password || ""}
                        onChange={handleChange}
                      />
                      {errors.password && touched.password ? (
                        <p className="error">{errors.password}</p>
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
