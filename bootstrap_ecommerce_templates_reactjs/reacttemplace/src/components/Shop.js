import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCT_URL } from "./URLS/url";

export default function Shop({ categories }) {
  let navigate = useNavigate();
  const [formSeacrh, setFormSearch] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [cursorProductCard, setCursorProductCard] = useState("");
  let isStop = false;
  const [offset, setOffset] = useState(0);
  const product_url = PRODUCT_URL;
  const [visible, setVisible] = useState("none");
  function handleOnChangeSearch(e) {
    setFormSearch(e.target.value);
  }

  
  const formatCurrency = (currency) => {
    let intCurrency = currency;
    const format = intCurrency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return format;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    if (localStorage.getItem("token") !== null) {
      if (!isStop) {
        getData();
      }
    } else {
      navigate("/login");
    }
    return () => {
      isStop = true;
    };
  }, [offset]);

  const getData = async (e) => {
    await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      url: `${product_url}/get-home?offset=${offset}`,
      method: "GET",
    })
      .then((res) => {
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        throw err;
      });
  };

  function handleSubmit() {}

  const handleGotoTop = (e) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  if (!products.length) {
    return (
      <>
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
        <section className="products-shop section">
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
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <div>
                  <div
                    className="bg-light border-right min-vh-50"
                    id="sidebar-wrapper"
                  >
                    <div className="sidebar-heading">
                      <h4>Categories</h4>
                    </div>
                    <div
                      className="list-group list-group-flush"
                      id="logsContainer"
                    >
                      {categories.map((category, index) => (
                        <Link
                          key={index}
                          to={{ pathname: `/shop/${category.name}` }}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <section className="widget widget-popular mb-5 mt-2">
                    <h3 className="widget-title mb-4 h4">Popular Products</h3>
                    <a className="popular-products-item media">
                      <img
                        src="assets/images/p-1.jpg"
                        alt=""
                        className="img-fluid mr-4"
                      />
                      <div className="media-body">
                        <h6>
                          Contrast <br />
                          Backpack
                        </h6>
                        <span className="price">$45</span>
                      </div>
                    </a>
                    <a className="popular-products-item media">
                      <img
                        src="assets/images/p-2.jpg"
                        alt=""
                        className="img-fluid mr-4"
                      />
                      <div className="media-body">
                        <h6>
                          Hoodie with <br />
                          Logo
                        </h6>
                        <span className="price">$45</span>
                      </div>
                    </a>
                    <a
                      className="popular-products-item media"
                      href="/product-single"
                    >
                      <img
                        src="assets/images/p-3.jpg"
                        alt=""
                        className="img-fluid mr-4"
                      />
                      <div className="media-body">
                        <h6>
                          Traveller
                          <br />
                          Backpack
                        </h6>
                        <span className="price">$45</span>
                      </div>
                    </a>
                  </section>
                </div>
              </div>
              {/* Đây là phần product listing */}
              <div className="col-md-10">
                <div className="row align-items-center">
                  <div className="col-lg-12 mb-4 mb-lg-0">
                    <div className="section-title">
                      {/*  */}
                      <h2 className="d-block text-left-sm">SHOP</h2>
                      {/*  */}
                      <div className="heading d-flex justify-content-between mb-5">
                        <span>
                          <input
                            id="searchBox"
                            name="search"
                            value={formSeacrh || ""}
                            className="rounded-left pl-3"
                            placeholder="Search"
                          ></input>

                          <button
                            id="searchIconBackGround"
                            className="rounded-right"
                          >
                            <i
                              id="searchIcon"
                              className="tf-ion-android-search"
                            ></i>
                          </button>
                        </span>
                        <form className="ordering " method="get">
                          <select
                            name="orderby"
                            className="orderby form-control"
                            aria-label="Shop order"
                          >
                            <option value="" selected="selected">
                              Sort by size
                            </option>
                            <option value="">L Large</option>
                            <option value="">XL Extra Large</option>
                            <option value="">M Medium</option>
                            <option value="">S Small</option>
                            <option value="">XS Extra Small</option>
                          </select>
                          <input type="hidden" name="paged" value="1" />
                        </form>
                        <form className="ordering " method="get">
                          <select
                            name="orderby"
                            className="orderby form-control"
                            aria-label="Shop order"
                          >
                            <option value="" selected="selected">
                              Sort by price
                            </option>
                            <option value="">Sort by popularity</option>
                            <option value="">Sort by average rating</option>
                            <option value="">Sort by latest</option>
                            <option value="">Sort by price: low to high</option>
                            <option value="">Sort by price: high to low</option>
                          </select>
                          <input type="hidden" name="paged" value="1" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {products.map((product) => (
                    <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
                      <div
                        className="product"
                        onClick={handleNavigateToProductDetails}
                        value={product.name}
                        onMouseOver={handleCursorProductCard}
                        style={{ cursor: cursorProductCard }}
                      >
                        <div className="product-wrap">
                          <a>
                            <img
                              className="img-fluid w-100 mb-3 img-first"
                              src={
                                product.productSFDetailDtos[0].imageList[0].url
                              }
                              alt="product-img"
                              style={{ height: 150 }}
                            />
                          </a>
                        </div>
                        <div className="product-hover-overlay">
                          <a href="#">
                            <i className="tf-ion-android-cart"></i>
                          </a>
                          <a href="#">
                            <i className="tf-ion-ios-heart"></i>
                          </a>
                        </div>
                        <div className="product-info">
                          <h2 className="product-title h5 mb-0">
                            <a>{product.name}</a>
                          </h2>
                          <span className="price">{formatCurrency(product.price)} đ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-12">
                    <div style={{ textAlign: "center" }}>
                      <button
                        disabled={offset + 1 <= 1}
                        onClick={() => handlePageChange(offset - 1)}
                      >
                        Prev
                      </button>
                      <span>{offset + 1}</span> / <span>{totalPages}</span>
                      <button
                        disabled={offset + 1 >= totalPages}
                        onClick={() => handlePageChange(offset + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const handleNavigateToProductDetails = function (e) {
    const product_name = e.currentTarget.getAttribute("value");
    navigate(`/single-product/${product_name}`);
  };

  const handleCursorProductCard = function () {
    setCursorProductCard("pointer");
  };

  const handlePageChange = function (newPage) {
    setOffset(newPage);
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

  const handleChangeSortByPrice = async (e) => {};
  return (
    <section className="products-shop section">
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
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <div>
              <div
                className="bg-light border-right min-vh-50"
                id="sidebar-wrapper"
              >
                <div className="sidebar-heading">
                  <h4>Categories</h4>
                </div>
                <div className="list-group list-group-flush" id="logsContainer">
                  {categories.map((category, index) => (
                    <Link
                      className="ml-3 mt-3"
                      key={index}
                      to={{ pathname: `/shop/${category.name}` }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Đây là phần product listing */}
          <div className="col-md-10">
            <div className="row align-items-center">
              <div className="col-lg-12 mb-4 mb-lg-0">
                <div
                  className="section-title mb-5 rounded-pill"
                  style={{
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "#fb5c42",
                    width: "200px",
                  }}
                >
                  {/*  */}
                  <h2
                    className="d-block text-left-sm"
                    style={{ color: "white" }}
                  >
                    ALL
                  </h2>
                  {/*  */}
                </div>
              </div>
            </div>

            <div className="row">
              {products.map((product, index) => (
                <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
                  <div
                    className="product"
                    onClick={handleNavigateToProductDetails}
                    value={[product.name]}
                    onMouseOver={handleCursorProductCard}
                    style={{
                      cursor: cursorProductCard,
                      border: "1px solid lightgrey",
                    }}
                  >
                    <div className="product-wrap">
                      <div
                        onClick={handleNavigateToProductDetails}
                        value={product.name}
                      >
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
                      {/* <Link
                        to={`/single-product/${product.productSFDetailDtos[0].serialNumber}`}
                      >
                        <i className="tf-ion-android-cart"></i>
                      </Link>
                      <a href="#">
                        <i className="tf-ion-ios-heart"></i>
                      </a> */}
                    </div>
                    <div className="product-info">
                      <h2
                        className="product-title h5 mb-0"
                        style={{
                          height: 80,
                          textAlign: "left",
                          fontSize: "15px",
                        }}
                      >
                        <a>{product.name}</a>
                      </h2>
                      <span className="price">
                        <h4 style={{ color: "red", textAlign: "left" }}>
                          {formatCurrency(product.priceListDtos[0].price) } đ
                        </h4>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12">
                {" "}
                <div style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-main mr-3"
                    disabled={offset + 1 <= 1}
                    onClick={() => handlePageChange(offset - 1)}
                  >
                    Prev
                  </button>
                  <span>{offset + 1}</span> / <span>{totalPages}</span>
                  <button
                    className="btn btn-main ml-3"
                    disabled={offset + 1 >= totalPages}
                    onClick={() => handlePageChange(offset + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
