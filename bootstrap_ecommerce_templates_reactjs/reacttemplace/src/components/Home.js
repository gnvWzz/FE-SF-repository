import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PRODUCT_URL } from "./URLS/url";

function Home(props) {
  const [offset, setOffset] = useState(0);
  const [cursor, setCursor] = useState("");
  const [products, setProducts] = useState([]);

  // const [showProducts, setShowProducts] = useState([]);

  const showProducts = [];

  const [totalPages, setTotalPages] = useState();

  const [cursorProductCard, setCursorProductCard] = useState("");

  let navigate = useNavigate();

  let product_url = PRODUCT_URL;

  let isStop = false;

  const [visible, setVisible] = useState("none");

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setOffset(offset + 1);
    }
  };

  const formatCurrency = (currency) => {
    let intCurrency = currency;
    const format = intCurrency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return format;
  };

  const handleCursorProductCard = function () {
    setCursorProductCard("pointer");
  };

  const handleNavigateToProductDetails = function (e) {
    const manufacturer = e.currentTarget.getAttribute("value");
    navigate(`/single-product/${manufacturer}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    localStorage.removeItem("category");
    localStorage.removeItem("sort_price");
    localStorage.removeItem("sort_name");
    localStorage.removeItem("min_price");
    localStorage.removeItem("max_price");
    if (!isStop) {
      axios
        .get(`${product_url}/get_home?offset=${offset}`)
        .then((res) => {
          setProducts(res.data.content);

          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          throw err;
        });
    }
    return () => {
      isStop = true;
    };
  }, [offset]);

  const navigateToDetail = (e) => {
    const product_name = e.currentTarget.getAttribute("value");
    navigate(`/single-product/${product_name}`);
  };

  const handleClickContinue = (e) => {
    // setOffset(offset + 1);
    navigate("/shop");
  };

  const handleGotoTop = (e) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible("inline");
    } else if (scrolled <= 300) {
      setVisible("none");
    }
  };

  window.addEventListener("scroll", toggleVisible);

  function handleCursorOver() {
    setCursor("pointer");
  }

  return (
    <div className="home-container">
      <button
        className="button-go-to-top"
        style={{
          borderColor: "#fb5c42",
          backgroundColor: "white",
          display: visible,
        }}
        onClick={handleGotoTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#fb5c42"
          class="bi bi-arrow-up"
          viewBox="0 0 16 16"
          onClick={handleGotoTop}
        >
          <path
            fill-rule="evenodd"
            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </button>

      <div className="main-slider slider slick-initialized slick-slider">
        <div
          className="slider-item"
          style={{
            backgroundImage: "url('assets/images/slideshow1-2.jpg')",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-12 offset-lg-6 offset-md-6">
                <div class="slider-caption">
                  <span class="lead">Every Day</span>

                  <h1 class="mt-2 mb-5">
                    <span class="text-color">Summer </span>Collection
                  </h1>

                  <Link to={{ pathname: "/shop" }} class="btn btn-main">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section products-main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="title text-center">
                <h2>New arrivals</h2>
                <p>The best Online sales to shop these weekend</p>
              </div>
            </div>
          </div>

          <div className="row" id="list">
            {products.map((product, index) => (
              <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
                <div
                  className="product"
                  onMouseOver={handleCursorOver}
                  style={{ cursor: cursor }}
                >
                  <div className="product-wrap">
                    <div onClick={navigateToDetail} value={product.name}>
                      {JSON.parse(
                        product.productSFDetailDtos[0].size_color_img_quantity
                      ).img.length !== 0 ? (
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src={
                            JSON.parse(
                              product.productSFDetailDtos[0]
                                .size_color_img_quantity
                            ).img[0].url
                          }
                          style={{ height: "250px" }}
                          alt="product_img"
                        />
                      ) : (
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                          style={{ height: "250px" }}
                          alt="product-img"
                        />
                      )}
                    </div>
                  </div>

                  <div className="product-hover-overlay">
                    {/* <div onClick={navigateToDetail} value={product.name}>
                      <a href="">
                        <i className="tf-ion-android-cart"></i>
                      </a>
                    </div> */}

                    {/* Wishlist */}
                    {/* <div onClick={navigateToDetail} value={product.packageId}>
                      <a href="">
                        <i className="tf-ion-ios-heart"></i>
                      </a>
                    </div> */}
                  </div>
                  <div className="product-info">
                    <h2 className="product-title h5 mb-0">
                      <div onClick={navigateToDetail} value={product.name}>
                        {product.name !== "" ? (
                          <Link
                            to={{
                              pathname: `/single-product/${product.name}`,
                            }}
                          >
                            {product.name}
                          </Link>
                        ) : (
                          <a href="">No name</a>
                        )}
                      </div>
                    </h2>
                    {product.priceListDtos.length !== 0 ? (
                      <span className="price">
                        <h4 style={{ color: "red", textAlign: "center" }}>
                          {formatCurrency(product.priceListDtos[0].price)} VND
                        </h4>
                      </span>
                    ) : (
                      <span className="price">
                        <h4 style={{ color: "red", textAlign: "center" }}>
                          0 VND
                        </h4>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleClickContinue}
              className="btn btn-main btn-small"
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
