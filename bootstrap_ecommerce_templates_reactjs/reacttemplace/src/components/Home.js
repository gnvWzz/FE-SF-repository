import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PRODUCT_URL } from "./URLS/url";

function Home(props) {
  const [offset, setOffset] = useState(0);

  const [products, setProducts] = useState([]);

  const [oldProducts, setOldProducts] = useState([]);

  const [totalPages, setTotalPages] = useState();

  const [cursorProductCard, setCursorProductCard] = useState("");

  let navigate = useNavigate();

  let product_url = PRODUCT_URL;

  let isStop = false;

  // const loadMoreProducts = async () => {
  //   await axios
  //     .get(`http://localhost:8080/api/product?offset=${offset}`)
  //     .then((res) => {
  //       setProducts((oldProducts) => [...oldProducts, res.data.content]);
  //       setTotalPages(res.data.totalPages);
  //     });
  // };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setOffset(offset + 1);
    }
  };

  const handleCursorProductCard = function () {
    setCursorProductCard("pointer");
  };

  const handleNavigateToProductDetails = function (e) {
    const manufacturer = e.currentTarget.getAttribute("value");

    navigate(`/single-product/${manufacturer}`);
  };

  useEffect(() => {
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

  // window.onscroll = function () {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     // you're at the bottom of the page, load more content here.
  //     console.log("reach end");
  //   } else {
  //     console.log("Dont end");
  //   }
  // };

  return (
    <div className="home-container">
      <div className="main-slider slider slick-initialized slick-slider">
        <div
          className="slider-item"
          style={{
            backgroundImage: "url('assets/images/slideshow1-2.jpg')",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 offset-lg-6 offset-md-6">
                <div className="slider-caption">
                  <span className="lead">Trendy dress</span>
                  <h1 className="mt-2 mb-5">
                    <span className="text-color">Winter </span>Collection
                  </h1>
                  <a href="#" className="btn btn-main">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="category section pt-3 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item mb-4 mb-lg-0">
                <img
                  src="assets/images/cat-1.jpg"
                  alt=""
                  className="img-fluid"
                />
                <div className="item-info">
                  <p className="mb-0">Stylish Leather watch</p>
                  <h4 className="mb-4">
                    up to <strong>50% </strong>off
                  </h4>
                  <a href="#" className="read-more">
                    Shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item mb-4 mb-lg-0">
                <img
                  src="assets/images/cat-2.jpg"
                  alt=""
                  className="img-fluid"
                />
                <div className="item-info">
                  <p className="mb-0">Ladies hand bag</p>
                  <h4 className="mb-4">
                    up to <strong>40% </strong>off
                  </h4>
                  <a href="#" className="read-more">
                    Shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item">
                <img
                  src="assets/images/cat-3.jpg"
                  alt=""
                  className="img-fluid"
                />
                <div className="item-info">
                  <p className="mb-0">Trendy shoe</p>
                  <h4 className="mb-4">
                    up to <strong>50% </strong>off
                  </h4>
                  <a href="#" className="read-more">
                    Shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                <div className="product">
                  <div className="product-wrap">
                    <a href="/product-single">
                      <img
                        className="img-fluid w-100 mb-3 img-first"
                        src={
                          JSON.parse(
                            product.productSFDetailDtos[0]
                              .size_color_img_quantity
                          ).img[0]
                        }
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
                      <a href="#">{product.name}</a>
                    </h2>
                    <span className="price">
                      {product.productSFDetailDtos[0].price1} đ
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
