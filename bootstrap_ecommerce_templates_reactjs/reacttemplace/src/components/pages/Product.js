import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Product({ categories }) {
  const [formSeacrh, setFormSearch] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState();
  const [cursorProductCard, setCursorProductCard] = useState("");
  const [category, setCategory] = useState([]);
  let { name } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/find-all/${name}`)
      .then((res) => {
        setProducts(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [name]);

  function getCategories() {

  }

  function handleOnChangeSearch(e) {
    setFormSearch(e.target.value);
  }

  function handleSubmit() {
    if (formSeacrh.length >= 2 && formSeacrh.length <= 30) {
      alert("finish");
    }
    console.log(formSeacrh.length);
    setFormSearch("");
  }

  function handleNavigateToProductDetails(e) {
    let serial_number = e.currentTarget.getAttribute("value");
    navigate(`/single-product/${serial_number}`)
  }

  function handleCursorProductCard() {
    setCursorProductCard("pointer")
  }

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
                <a
                  className="popular-products-item media"

                >
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
                <a
                  className="popular-products-item media"

                >
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
                        onChange={handleOnChangeSearch}
                      ></input>

                      <button
                        id="searchIconBackGround"
                        className="rounded-right"
                      >
                        <i
                          id="searchIcon"
                          className="tf-ion-android-search"
                          onClick={handleSubmit}
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
                  <div className="product" onClick={handleNavigateToProductDetails} value={product.serial_number} onMouseOver={handleCursorProductCard} style={{ cursor: cursorProductCard }}>
                    <div className="product-wrap">
                      <a>
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src={product.list[0]}
                          alt="product-img"
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
              )
              )}
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item">
                    <button disabled style={{ cursor: "not-allowed" }}>
                      <span aria-hidden="true">&laquo; Previous</span>
                    </button>
                  </li>
                  <li className="page-item active">
                    <button>1</button>
                  </li>
                  <li className="page-item active">
                    <button>2</button>
                  </li>
                  <li className="page-item active">
                    <button>3</button>
                  </li>
                  <li className="page-item">
                    <button>
                      <span aria-hidden="true">&raquo; Next</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}