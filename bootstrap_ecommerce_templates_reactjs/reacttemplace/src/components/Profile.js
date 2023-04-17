import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCOUNT_URL } from "./URLS/url";

function Profile() {
  const loginName = localStorage.getItem("username");
  const [user, setUser] = useState({});
  const url = ACCOUNT_URL;
  useEffect(() => {
    axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      url: `${url}/user/${loginName}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        if (res.data !== null) {
          setUser(res.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div>
      <div class="container">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar">
                      <img
                        src="https://gocbao.net/wp-content/uploads/2020/10/avatar-trang-4.jpg"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 class="user-name">
                      {user.firstName} {user.lastName}{" "}
                    </h5>
                    <h6 class="user-email">{user.email}</h6>
                  </div>
                  <div>
                    <a
                      href="/upload-img"
                      className="btn btn-small btn-main btn-block  "
                      style={{ width: "220px", height: "40px" }}
                    >
                      Upload Avatar
                    </a>
                    <a
                      href="/password"
                      className="btn btn-small btn-main btn-block  "
                      style={{ width: "220px", height: "40px" }}
                    >
                      Update Password
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="firstName">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="firstName"
                        value={user.firstName}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="lastName">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="lastName"
                        value={user.lastName}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        value={user.phone}
                      />
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Address</h6>
                  </div>
                  {/* <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="Street">Street</label>
					<input type="name" class="form-control" id="Street" placeholder="Enter Street"/>
				</div>
			</div> */}
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">Province</label>
                      <input
                        type="name"
                        class="form-control"
                        name="city"
                        value={user.city}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="sTate">District</label>
                      <input
                        type="text"
                        class="form-control"
                        name="district"
                        value={user.district}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="zIp">Street Address</label>
                      <input
                        type="text"
                        class="form-control"
                        name="street"
                        value={user.street}
                      />
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      <button
                        style={{ height: "45px" }}
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        style={{ height: "45px" }}
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
