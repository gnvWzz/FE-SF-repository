import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Pagination from "../pagination";
import { PRODUCT_URL } from "../URLS/url";
export default function Product({ categories }) {
  const [formSeacrh, setFormSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [cursorProductCard, setCursorProductCard] = useState("");
  const [sort_price, setSortPrice] = useState("");
  const [max_price, setMaxPrice] = useState();
  const [min_price, setMinPrice] = useState();
  const [change, setChange] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [checkMinMaxPrice, setCheckMinMaxPrice] = useState(false);
  const [visible, setVisible] = useState("none");
  let isStop = false;
  let { name } = useParams();
  let navigate = useNavigate();

  const [offset, setOffset] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const url = PRODUCT_URL;

  // Long da them o day ne ================================ lay du lieu khuc nay may cai kia chua co lam
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      if (!isStop) {
        if (localStorage.getItem("sort_price") !== null) {
          console.log("sort_price " + offset);
          axios({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            url: `${url}/${name}?offset=${offset}&sort=${sort_price}`,
            method: "GET",
          })
            .then((res) => {
              setProducts(res.data.content);
              setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
              throw err;
            });
        } else if (localStorage.getItem("sort_name") !== null) {
          axios({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            url: `${url}/getName/${name}?offset=${offset}&name=${formSeacrh}`,
            method: "GET",
          })
            .then((res) => {
              setProducts(res.data.content);
              setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
              throw err;
            });
          console.log("sort_name " + offset);
        } else if (
          localStorage.getItem("min_price") !== null &&
          localStorage.getItem("max_price") !== null
        ) {
          axios({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            url: `${url}/max_min/${name}?offset=${offset}&min_price=${min_price}&max_price=${max_price}`,
            method: "GET",
          })
            .then((res) => {
              setProducts(res.data.content);
              setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
              throw err;
            });
        } else {
          axios({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            url: `${url}/${name}?offset=${offset}`,
            method: "GET",
          })
            .then((res) => {
              setProducts(res.data.content);
              setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
              throw err;
            });
        }
      }
    } else {
      navigate("/login");
    }
    return () => {
      isStop = true;
    };
  }, [offset]);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.scrollTo({ top: 0, left: 0 });
      localStorage.removeItem("sort_price");
      localStorage.removeItem("sort_name");
      localStorage.removeItem("min_price");
      localStorage.removeItem("max_price");
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem("sort_price");
    localStorage.removeItem("sort_name");
    localStorage.removeItem("min_price");
    localStorage.removeItem("max_price");
    if (localStorage.getItem("token") !== null) {
      setOffset(0);
      localStorage.setItem("category", name);
      if (!isStop) {
        axios({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          url: `${url}/${name}?offset=${offset}`,
          method: "GET",
        })
          .then((res) => {
            setProducts(res.data.content);
            setTotalPages(res.data.totalPages);
          })
          .catch((err) => {
            throw err;
          });
      }
    } else {
      navigate("/login");
    }
    return () => {
      isStop = true;
    };
  }, [name]);

  useEffect(() => {
    if (formSeacrh.length === 0) {
      axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${url}/${name}?offset=${offset}`,
        method: "GET",
      })
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [formSeacrh]);

  if (!products.length) {
    return (
      <>
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
        <section className="products-shop section">
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
                      <h2 className="d-block text-left-sm">{name}</h2>
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
                        <span className="onsale">Sale</span>
                        <div className="product-hover-overlay">
                          <Link
                            to={{ pathname: `single-product/${product.name}` }}
                          >
                            <i className="tf-ion-android-cart"></i>
                          </Link>
                          <a href="">
                            <i className="tf-ion-ios-heart"></i>
                          </a>
                        </div>
                        <div className="product-info">
                          <h2 className="product-title h5 mb-0">
                            <a>{product.name}</a>
                          </h2>
                          <span className="price">{product.price} đ</span>
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

  const getData = () => {};

  const formatCurrency = (currency) => {
    let intCurrency = currency;
    const format = intCurrency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return format;
  };

  const handleOnChangeSearch = function (e) {
    setFormSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (formSeacrh.length >= 2 && formSeacrh.length <= 30) {
      localStorage.removeItem("sort_price");
      localStorage.setItem("sort_name", formSeacrh);
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${url}/getName/${name}?offset=${offset}&name=${formSeacrh}`,
        method: "GET",
      })
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
          e.preventDefault();
        })
        .catch((err) => {
          throw err;
        });
    }
  };

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

  const handleChangeSortByPrice = async (e) => {
    if (e.target.value === "none") {
      setOffset(0);
      localStorage.removeItem("sort_price");
      localStorage.removeItem("sort_name");
      localStorage.removeItem("min_price");
      localStorage.removeItem("max_price");
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${url}/${name}?offset=${offset}`,
        method: "GET",
      })
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      setSortPrice(e.target.value);
      localStorage.removeItem("sort_name");
      localStorage.removeItem("min_price");
      localStorage.removeItem("max_price");
      localStorage.setItem("sort_price", e.target.value);
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${url}/${name}?offset=${offset}&sort=${e.target.value}`,
        method: "GET",
      })
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const handleEnterSearch = async (e) => {
    if (e.key === "Enter") {
      if (formSeacrh.length >= 2 && formSeacrh.length <= 30) {
        localStorage.removeItem("sort_price");
        localStorage.removeItem("sort_name");
        localStorage.removeItem("min_price");
        localStorage.removeItem("max_price");
        localStorage.setItem("sort_name", formSeacrh);
        await axios({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          url: `${url}/getName/${name}?offset=${offset}&name=${formSeacrh}`,
          method: "GET",
        })
          .then((res) => {
            setProducts(res.data.content);
            setTotalPages(res.data.totalPages);
            e.preventDefault();
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  };

  const handleChangeMinPrice = (e) => {
    setMinPrice(parseInt(e.target.value));
  };

  const handleChangeMaxPrice = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };

  const handleSortByMinMaxPrice = async (e) => {
    if (min_price <= max_price) {
      localStorage.removeItem("sort_name");
      localStorage.removeItem("sort_price");
      localStorage.setItem("min_price", min_price);
      localStorage.setItem("max_price", max_price);
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${url}/max_min/${name}?offset=${offset}&min_price=${min_price}&max_price=${max_price}`,
        method: "GET",
      })
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const handleBackToAnyPriceProducts = () => {
    window.location.reload();
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

  console.log(products)

  window.addEventListener("scroll", toggleVisible);

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
                <div className="mt-5">
                  <button
                    style={{
                      width: "150px",
                      height: "50px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onClick={handleBackToAnyPriceProducts}
                    type="button"
                    className="btn btn-main mt-2"
                  >
                    Any price
                  </button>
                  <input
                    className="mt-2"
                    style={{ width: "150px" }}
                    type="number"
                    placeholder="min"
                    onChange={handleChangeMinPrice}
                    onWheel={(e) => e.target.blur()}
                  ></input>
                  <input
                    className="mt-2"
                    style={{ width: "150px" }}
                    type="number"
                    placeholder="max"
                    onChange={handleChangeMaxPrice}
                    onWheel={(e) => e.target.blur()}
                  ></input>
                  <button
                    style={{
                      width: "150px",
                      height: "50px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onClick={handleSortByMinMaxPrice}
                    type="button"
                    className="btn btn-main mt-2"
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Đây là phần product listing */}
          <div className="col-md-10">
            <div className="row align-items-center">
              <div className="col-lg-12 mb-4 mb-lg-0">
                <div className="section-title">
                  {/*  */}
                  <h2 className="d-block text-left-sm">{name}</h2>
                  {/*  */}
                  <div className="heading d-flex justify-content-between mb-5">
                    <span>
                      <input
                        id="searchBox"
                        name="search"
                        value={formSeacrh || ""}
                        className="rounded-left pl-3"
                        placeholder="Search"
                        onChange={handleOnChangeSearch}
                        onKeyDown={handleEnterSearch}
                      ></input>

                      <button
                        id="searchIconBackGround"
                        className="rounded-right"
                        onClick={handleSubmit}
                      >
                        <i
                          id="searchIcon"
                          className="tf-ion-android-search"
                        ></i>
                      </button>
                    </span>

                    <form className="ordering " method="get">
                      <select
                        id="sort_price"
                        name="orderby"
                        className="orderby form-control"
                        aria-label="Shop order"
                        onChange={handleChangeSortByPrice}
                      >
                        <option value="none" selected="selected">
                          Default
                        </option>
                        <option value="asc">Sort by price: low to high</option>
                        <option value="desc">Sort by price: high to low</option>
                      </select>
                      <input type="hidden" name="paged" value="1" />
                    </form>
                  </div>
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
                          alt="product-img"
                          style={{ height: 200 }}
                        />
                      ) : (
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                          alt="product-img"
                          style={{ height: 200 }}
                        />
                      )}
                    </div>

                    <div className="product-hover-overlay">
                      {/* <a href="#">
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
                        {product.priceListDtos[0].price !== "" ? (
                          <h4 style={{ color: "red", textAlign: "left" }}>
                            {formatCurrency(product.priceListDtos[0].price)} đ
                          </h4>
                        ) : (
                          <h4 style={{ color: "red", textAlign: "left" }}>
                            0 đ
                          </h4>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Chuyen trang */}
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

      {/* On top */}
    </section>
  );
}
