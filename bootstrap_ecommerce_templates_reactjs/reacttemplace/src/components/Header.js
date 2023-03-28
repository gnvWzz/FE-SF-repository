import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from "react-router-dom";
function Header() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-white w-100 navigation" id="navbar">
        <div class="container">
            <Link class="navbar-brand font-weight-bold" to={{ pathname: "/"}}>E-Shop</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
            aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="main-navbar">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item active">
                <Link class="nav-link" to={{ pathname: "/"}}>Home</Link>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">About Us</a>
                </li>
              
                <li class="nav-item dropdown dropdown-slide">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown4" role="button" data-delay="350"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Pages.
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown4">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Blog Single</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">404 Page</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
                </li>
                <li class="nav-item dropdown dropdown-slide">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-delay="350"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Shop.
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown3">
                    <li><Link to={{ pathname: "/shop"}}>Shop</Link></li>
                    <li><Link to={{ pathname: "/single-product"}}>Product Details</Link></li>
                    <li><Link to={{ pathname: "/checkout"}}>Checkout</Link></li>
                    <li><Link to={{ pathname: "/cart"}}>Cart</Link></li>
                </ul>
                </li>
              
                <li class="nav-item dropdown dropdown-slide">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown5" role="button" data-delay="350"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account.
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown5">
                    <li><Link to={{ pathname: "/login"}}>Login Page</Link></li>
                    <li><Link to={{ pathname: "/signup"}}>SignUp Page</Link></li>
                    <li><Link to={{ pathname: "/forgot-password"}}>Forgot Password</Link></li>
                </ul>
                </li>
            </ul>
            </div>
        
            <ul class="top-menu list-inline mb-0 d-none d-lg-block" id="top-menu">
            <li class="list-inline-item">
                <a href="#" class="search_toggle" id="search-icon"><i class="tf-ion-android-search"></i></a>
            </li>
            <li class="dropdown cart-nav dropdown-slide list-inline-item">
                <a href="#" class="dropdown-toggle cart-icon" data-toggle="dropdown" data-hover="dropdown">
                <i class="tf-ion-android-cart"></i>
                </a>
                <div class="dropdown-menu cart-dropdown">
               
                <div class="media">
                    <a href="/product-single">
                    <img class="media-object img- mr-3" src="assets/images/cart-1.jpg" alt="image" />
                    </a>
                    <div class="media-body">
                    <h6>Ladies Bag</h6>
                    <div class="cart-price">
                        <span>1 x</span>
                        <span>1250.00</span>
                    </div>
                    </div>
                    <a href="#" class="remove"><i class="tf-ion-close"></i></a>
                </div>
              
                <div class="media">
                    <a href="/product-single">
                    <img class="media-object img-fluid mr-3" src="assets/images/cart-2.jpg" alt="image" />
                    </a>
                    <div class="media-body">
                    <h6>Skinny Jeans</h6>
                    <div class="cart-price">
                        <span>1 x</span>
                        <span>1250.00</span>
                    </div>
                    </div>
                    <a href="#" class="remove"><i class="tf-ion-close"></i></a>
                </div>
                <div class="cart-summary">
                    <span class="h6">Total</span>
                    <span class="total-price h6">$1799.00</span>
                    <div class="text-center cart-buttons mt-3">
                    <a href="#" class="btn btn-small btn-transparent btn-block">View Cart</a>
                    <a href="#" class="btn btn-small btn-main btn-block">Checkout</a>
                    </div>
                </div>
                </div>
            </li>
            <li class="list-inline-item"><a href="#"><i class="tf-ion-ios-person mr-3"></i></a></li>
            </ul>
        </div>
        </nav>
    );
}
export default Header;