import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp({ provinces }) {
  const REGEX = {
    //username có ít nhất 8 kí tự dài nhất 20 kí tự, không có các dấu chấm . _ ở đầu tên giữa và cuối tên
    usernameRegex: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //email tuân theo RFC 2822
    emailRegex:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    //password có ít nhất 8 kí tự, có chữ cái in hoa, chữ cái thường, kí tự đặt biệt
    passwordRegex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    phoneRegex: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
  };

  const [form, setForm] = useState({
    email: "",
    username: "",
    phone: "",
    city: "",
    district: "",
    street: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [msgError, setmsgError] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const isFilled =
      form.username &&
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.city &&
      form.firstName &&
      form.lastName &&
      form.street &&
      form.district;

    const isError =
      isFilled &&
      (msgError.email ||
        msgError.username ||
        msgError.password ||
        msgError.confirmPassword);

    if (isFilled && !isError) {
      axios
        .post(`http://localhost:8080/api/account/signup`, form)
        .then((res) => {})
        .catch((err) => {
          throw err;
        });
      alert("Đăng kí thành công! ");
      navigate(`/login`);
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleValidate = async () => {
    const errors = {
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };
    const isValidEmail = REGEX.emailRegex.test(form.email);
    const isValidUsername = REGEX.usernameRegex.test(form.username);
    const isValidPhone = REGEX.phoneRegex.test(form.phone);
    if (!form.email) {
      errors.email = "Bắt buộc";
    } else if (!isValidEmail) {
      errors.email = "Email không hợp lệ";
    } else if (isValidEmail) {
      const data = form.email;
      await axios
        .get(`http://localhost:8080/api/account/duplicate-email/${data}`)
        .then((res) => {
          if (res.data === "Exist") {
            errors.email = "Email đã tồn tại";
          } else {
            errors.email = "";
          }
        })
        .catch((err) => {
          throw err;
        });
    }

    if (!form.username) {
      errors.username = "Bắt buộc";
    } else if (!isValidUsername) {
      errors.username = "Tài khoản chưa đúng,ít nhất 8 kí tự";
    } else if (isValidUsername) {
      const data = form.username;
      await axios
        .get(`http://localhost:8080/api/account/duplicate-username/${data}`)
        .then((res) => {
          if (res.data === "Exist") {
            errors.username = "Username đã tồn tại";
          } else {
            errors.username = "";
          }
        })
        .catch((err) => {
          throw err;
        });
    }

    if (!form.phone) {
      errors.phone = "Bắt buộc";
    } else if (!isValidPhone) {
      errors.phone = "Số điện thoại chưa đúng";
    } else if (isValidPhone) {
      const data = form.phone;
      await axios
        .get(`http://localhost:8080/api/account/duplicate-phone/${data}`)
        .then((res) => {
          if (res.data === "Exist") {
            errors.phone = "Số điện thoại đã tồn tại";
          } else {
            errors.phone = "";
          }
        })
        .catch((err) => {
          throw err;
        });
    }

    if (!form.password) {
      errors.password = "Bắt buộc";
    } else if (!REGEX.passwordRegex.test(form.password)) {
      errors.password =
        "Mật khẩu có ít nhất 8 kí tự,1 chữ cái In hoa, số và kí tự đặt biệt ";
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = "Bắt buộc";
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Mật khẩu chưa trùng khớp";
    }
    setmsgError(errors);
    return errors;
  };

  return (
    <div className="signUp-container">
      <div class="account section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="login-form border p-5">
                <div class="text-center heading">
                  <h2 class="mb-2">Sign Up</h2>
                  <p class="lead">
                    Already have an account? <a href="/login"> Login now</a>
                  </p>
                </div>
                <Formik
                  initialValues={form}
                  validate={handleValidate}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-4">
                        <label for="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="street"
                          name="firstName"
                          placeholder="Enter your First Name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label for="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="street"
                          name="lastName"
                          placeholder="Enter your Last Name"
                          onChange={handleChange}
                        />
                      </div>

                      <div
                        class="form-group mb-4"
                        className={`custom-input ${
                          errors.email
                            ? "form-group mb-4 custom-input-error"
                            : "form-group mb-4"
                        }`}
                      >
                        <label for="#"> Email Address</label>
                        <Field
                          type="email"
                          className="form-control"
                          name="email"
                          value={form.email || ""}
                          placeholder="Enter Email Address"
                          onChange={handleChange}
                        />
                        {errors.email && touched.email ? (
                          <p className="error">{errors.email}</p>
                        ) : null}
                      </div>
                      <div
                        class="form-group mb-4"
                        className={`custom-input ${
                          errors.username ? "custom-input-error" : ""
                        }`}
                      >
                        <label for="#"> Username</label>
                        <a class="float-right" href="">
                          Forget password?
                        </a>
                        <Field
                          type="text"
                          class="form-control"
                          placeholder="Enter username"
                          name="username"
                          value={form.username || ""}
                          onChange={handleChange}
                        />
                        {errors.username && touched.username ? (
                          <p className="error">{errors.username}</p>
                        ) : null}
                      </div>
                      <div
                        class="form-group mb-4"
                        className={`custom-input ${
                          errors.phone ? "custom-input-error" : ""
                        }`}
                      >
                        <label for="#"> Phone</label>
                        <Field
                          type="text"
                          class="form-control"
                          placeholder="Enter Phone"
                          name="phone"
                          value={form.phone || ""}
                          onChange={handleChange}
                        />
                        {errors.phone && touched.phone ? (
                          <p className="error">{errors.phone}</p>
                        ) : null}
                      </div>
                      <div class="form-group mb-4">
                        <label for="company_name">Province</label>
                        <select
                          className="form-control"
                          name="city"
                          onChange={handleChange}
                        >
                          <option value="">Select an Option</option>
                          {provinces.map((province) => (
                            <option value={province.name}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group mb-4">
                        <label for="first_name">District</label>
                        <input
                          type="text"
                          className="form-control"
                          id="street"
                          name="district"
                          placeholder="Enter your District"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label for="first_name">Street Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="street"
                          name="street"
                          placeholder="Enter your Street Address"
                          onChange={handleChange}
                        />
                      </div>

                      <div
                        class="form-group mb-4"
                        className={`custom-input ${
                          errors.password ? "custom-input-error" : ""
                        }`}
                      >
                        <label for="#"> Password</label>
                        <Field
                          type="password"
                          class="form-control"
                          placeholder="Enter Password"
                          name="password"
                          value={form.password || ""}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password ? (
                          <p className="error">{errors.password}</p>
                        ) : null}
                      </div>
                      <div
                        class="form-group"
                        className={`custom-input ${
                          errors.confirmPassword ? "custom-input-error" : ""
                        }`}
                      >
                        <label for="#">Confirm Password</label>
                        <Field
                          type="password"
                          class="form-control"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={form.confirmPassword || ""}
                          onChange={handleChange}
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <p className="error">{errors.confirmPassword}</p>
                        ) : null}
                      </div>
                      <button class="btn btn-main mt-3 btn-block" type="submit">
                        Signup
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

export default SignUp;
