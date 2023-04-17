import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Header({ categories }) {
  const navigate = useNavigate();

  const handleOut = () =>{
   localStorage.clear();
   navigate(`/`);
   setTimeout(() => {
     window.location.reload();
   }, 100);
    
  }

  const handleLogin = () =>{
    return(
      <li className="dropdown cart-nav dropdown-slide list-inline-item">
            <a href="#">
              <i className="tf-ion-ios-person mr-3"></i>
            </a>
            <div className="dropdown-menu cart-dropdown">          
              <div className="cart-summary">
                <div className="text-center cart-buttons mt-3">
                  <a
                    href="#"
                    className="btn btn-small btn-transparent btn-block "
                    style={{width:"250px",height:"40px"}}
                  >
                    My Orders
                  </a>
                  <a
                    href="#"
                    className="btn btn-small btn-transparent btn-block "
                    style={{width:"250px",height:"40px"}}
                  >
                    My Favorites
                  </a>
                  <a
                    href="/profile"
                    className="btn btn-small btn-transparent btn-block "
                    style={{width:"250px",height:"40px"}}
                  >
                    Profile
                  </a>
                  <a onClick={handleOut} className="btn btn-small btn-main btn-block" style={{width:"250px",height:"40px"}}>
                   Logout
                  </a>
                </div>
              </div>
            </div>
          </li>
    )
  }
  const handleLogout = ()=>{
    return(
      <li className="dropdown cart-nav dropdown-slide list-inline-item">
          <a href="#">
            <i className="tf-ion-ios-person mr-3"></i>
          </a>
          <div className="dropdown-menu cart-dropdown">          
            <div className="cart-summary">
              <div className="text-center cart-buttons mt-3">
                <a
                  href="/login"
                  className="btn btn-small btn-transparent btn-block "
                  style={{width:"250px",height:"40px"}}
                >
                  Login
                </a>
                <a href="/signup" className="btn btn-small btn-main btn-block" style={{width:"250px",height:"40px"}}>
                 SignUp
                </a>
              </div>
            </div>
          </div>
        </li>
    )
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation"
      id="navbar"
    >
      <div className="container">
        <Link className="navbar-brand font-weight-bold" to={{ pathname: "/" }}>
          E-Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="main-navbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={{ pathname: "/" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item dropdown dropdown-slide">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown4"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Pages
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Blog Single</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">404 Page</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown dropdown-slide">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown3"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                <li>
                  <Link to={{ pathname: "/shop" }}>Shop</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/cart" }}>Cart</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown dropdown-slide">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown3"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                {categories.map((category, index) => (
                  <li>
                    <Link
                      key={index}
                      to={{ pathname: `/shop/${category.name}` }}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item dropdown dropdown-slide">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown5"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Account
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                <li>
                  <Link to={{ pathname: "/login" }}>Login Page</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/signup" }}>SignUp Page</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/forgot-password" }}>
                    Forgot Password
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <ul
          className="top-menu list-inline mb-0 d-none d-lg-block"
          id="top-menu"
        >
          <li className="list-inline-item">
            <a href="#" className="search_toggle" id="search-icon">
              <i className="tf-ion-android-search"></i>
            </a>
          </li>
          <li className="dropdown cart-nav dropdown-slide list-inline-item">
            <a
              href="#"
              className="dropdown-toggle cart-icon"
              data-toggle="dropdown"
              data-hover="dropdown"
            >
              <i className="tf-ion-android-cart"></i>
            </a>
            <div className="dropdown-menu cart-dropdown">
              <div className="media">
                <a href="/product-single">
                  <img
                    className="media-object img- mr-3"
                    src="assets/images/cart-1.jpg"
                    alt="image"
                  />
                </a>
                <div className="media-body">
                  <h6>Ladies Bag</h6>
                  <div className="cart-price">
                    <span>1 x</span>
                    <span>1250.00</span>
                  </div>
                </div>
                <a href="#" className="remove">
                  <i className="tf-ion-close"></i>
                </a>
              </div>
              <div className="media">
                <a href="/product-single">
                  <img
                    className="media-object img-fluid mr-3"
                    src="assets/images/cart-2.jpg"
                    alt="image"
                  />
                </a>
                <div className="media-body">
                  <h6>Skinny Jeans</h6>
                  <div className="cart-price">
                    <span>1 x</span>
                    <span>1250.00</span>
                  </div>
                </div>
                <a href="#" className="remove">
                  <i className="tf-ion-close"></i>
                </a>
              </div>
              <div className="cart-summary">
                <span className="h6">Total</span>
                <span className="total-price h6">$1799.00</span>
                <div className="text-center cart-buttons mt-3">
                  <a
                    href="#"
                    className="btn btn-small btn-transparent btn-block"
                  >
                    View Cart
                  </a>
                  <a href="#" className="btn btn-small btn-main btn-block">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </li>
          
          {localStorage.getItem("token")?
            handleLogin()
          :
          handleLogout()
          }
        
        </ul>
      </div>
    </nav>
  );
}
export default Header;