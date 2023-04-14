import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Pagination from "../pagination";
import queryString from "query-string";
import { PRODUCT_URL } from "../URLS/url";
export default function Product({ categories }) {
  const [formSeacrh, setFormSearch] = useState();
  const [products, setProducts] = useState([]);
  const [cursorProductCard, setCursorProductCard] = useState("");
  const [sort_price, setSortPrice] = useState("");
  const [change, setChange] = useState(false);
  const [imageList, setImageList] = useState([]);
  let isStop = false;
  let { name } = useParams();
  let navigate = useNavigate();

  let useToken = localStorage.getItem("token");

  const [offset, setOffset] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const url = PRODUCT_URL;

  // Long da them o day ne ================================ lay du lieu khuc nay may cai kia chua co lam
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setOffset(0);
      if (!isStop) {
        axios({
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': "*",
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
  }, [offset]);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setOffset(0);
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

  const handleOnChangeSearch = function (e) {
    setFormSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (formSeacrh.length >= 2 && formSeacrh.length <= 30) {
      setFormSearch(e.target.value);
      await axios
        .get(
          `http://localhost:8080/api/product/${name}?offset=${offset}&sort_name=${formSeacrh}`
        )
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const handleNavigateToProductDetails = function (e) {
    const package_id = e.currentTarget.getAttribute("value");
    navigate(`/single-product/${package_id}`);
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
      await axios
        .get(`http://192.168.4.182:8080/api/product/${name}?offset=${offset}`)
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      setSortPrice(e.target.value);
      await axios
        .get(
          `http://localhost:8080/api/product/${name}?offset=${offset}&sort_price=${e.target.value}`
        )
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
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
                        name="orderby"
                        className="orderby form-control"
                        aria-label="Shop order"
                      >
                        <option value="" selected="selected">
                          Sort by size
                        </option>
                        <option value="L">L Large</option>
                        <option value="XL">XL Extra Large</option>
                        <option value="M">M Medium</option>
                        <option value="S">S Small</option>
                        <option value="XS">XS Extra Small</option>
                      </select>
                      <input type="hidden" name="paged" value="1" />
                    </form>
                    <form className="ordering " method="get">
                      <select
                        name="orderby"
                        className="orderby form-control"
                        aria-label="Shop order"
                        onChange={handleChangeSortByPrice}
                      >
                        <option value="none" selected="selected">
                          Sort by price
                        </option>
                        <option value="">Sort by popularity</option>
                        <option value="">Sort by average rating</option>
                        <option value="">Sort by latest</option>
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
                    value={[product.packageId]}
                    onMouseOver={handleCursorProductCard}
                    style={{
                      cursor: cursorProductCard,
                      border: "1px solid lightgrey",
                    }}
                  >
                    <div className="product-wrap">
                      <img
                        className="img-fluid w-100 mb-3 img-first"
                        src={
                          JSON.parse(
                            product.productSFDetailDtos[0]
                              .size_color_img_quantity
                          ).img[0]
                        }
                        alt="product-img"
                        style={{ height: 200 }}
                      />
                    </div>
                    <span className="onsale">Sale</span>
                    <div className="product-hover-overlay">
                      <Link
                        to={`/single-product/${product.productSFDetailDtos[0].serialNumber}`}
                      >
                        <i className="tf-ion-android-cart"></i>
                      </Link>
                      <a href="#">
                        <i className="tf-ion-ios-heart"></i>
                      </a>
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
                          {product.productSFDetailDtos[0].price} đ
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
  );
}
