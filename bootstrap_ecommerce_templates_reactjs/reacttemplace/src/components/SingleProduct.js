import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const [quantity, setQuantity] = useState(1);
  const [cursor, setCursor] = useState("");
  const { package_id } = useParams();
  const [product, setProduct] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [productDetail, setProductDetail] = useState({})
  const [productColors, setProductColors] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [categoriesNoSizesAndColors, setCategoriseNoSizesAndColors] = useState(["Computer", "Electronics", "Toys"])
  const [stock, setStock] = useState();
  const [choosingColor, setChoosingColor] = useState("");
  const [choosingSize, setChoosingSize] = useState("");
  const [imgList, setImgList] = useState([]);
  let isStop = false;

  useEffect(() => {
    if (!isStop) {
      const tempList = [];
      axios
        .get(`http://localhost:8080/api/product/package-id-product/${package_id}`)
        .then((res) => {
          setProduct(res.data);
          generateProductColors(res.data);
          generateProductSizes(res.data);
          setProductDetails(res.data.productSFDetailDtos);
          setProductDetail(res.data.productSFDetailDtos[0]);
          setStock(JSON.parse(res.data.productSFDetailDtos[0].size_color_img_quantity).quantity);
          setChoosingColor(JSON.parse(res.data.productSFDetailDtos[0].size_color_img_quantity).color);
          setChoosingSize(JSON.parse(res.data.productSFDetailDtos[0].size_color_img_quantity).size);
          res.data.productSFDetailDtos.map((p) => {
            ((JSON.parse(p.size_color_img_quantity)).img).map((i) => {
              const temp = {
                color: "",
                img: ""
              }
              temp.color = (JSON.parse(p.size_color_img_quantity)).color;
              temp.img = i
              console.log(temp);
              if (!tempList.includes(temp)) {
                tempList.push(temp);
              }
            })
          })
          setImgList(tempList);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    return () => {
      isStop = true;
    }
  }, [])

  const generateProductColors = (data) => {
    let colors = [];
    data.productSFDetailDtos.map((p) => {
      if (!colors.includes((JSON.parse(p.size_color_img_quantity)).color)) {
        colors.push((JSON.parse(p.size_color_img_quantity)).color)
      }
    })
    setProductColors(colors);
  }

  const generateProductSizes = (data) => {
    let sizes = [];
    data.productSFDetailDtos.map((p) => {
      if (!sizes.includes((JSON.parse(p.size_color_img_quantity)).size)) {
        sizes.push((JSON.parse(p.size_color_img_quantity)).size)
      }
    })
    setProductSizes(sizes);
  }

  function handleDecreaseQuantity() {
    setQuantity(quantity - 1);
    if (quantity === 2) {
      setCursor("not-allowed");
    }
  }

  function handleIncreaseQuantity() {
    setQuantity(quantity + 1);
    console.log(imgList);
  }

  function handleCursorOver() {
    if (quantity > 1) {
      setCursor("pointer");
    } else {
      setCursor("not-allowed");
    }
  }

  const handleGetProductDetailByColorAndSize = async (e) => {
    const c = e.currentTarget.getAttribute("value");
    await axios
      .get(`http://localhost:8080/api/product/find-product-detail-by-color-and-size/${c}/${choosingSize}/${package_id}`)
      .then((res) => {
        setProductDetail(res.data);
        console.log(res.data)
        setStock(JSON.parse(res.data.size_color_img_quantity).quantity);
        setChoosingColor(c);
        console.log(c)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChoosingSize = async (e) => {
    const s = e.target.value;
    await axios
      .get(`http://localhost:8080/api/product/find-product-detail-by-color-and-size/${choosingColor}/${s}/${package_id}`)
      .then((res) => {
        setProductDetail(res.data);
        setStock(JSON.parse(res.data.size_color_img_quantity).quantity);
        setChoosingSize(s);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="single-product-container">
      <section class="single-product">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              {/* <div class="single-product-slider">
                <div
                  class="carousel slide"
                  data-ride="carousel"
                  id="single-product-slider"
                >
                  <div class="carousel-inner" style={{ textAlign: "center" }}>
                    <div class="carousel-item active">
                      <img src={product.list[0]} alt="" class="img-fluid" />
                    </div>
                    {product.list.map((img) => (
                      <div class="carousel-item">
                        <img src={img} alt="" class="img-fluid" />
                      </div>
                    ))}
                  </div>

                  <ol class="carousel-indicators">
                    <li
                      data-target="#single-product-slider"
                      data-slide-to="0"
                      class="active"
                    >
                      <img
                        src="assets/images/product-3.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </li>
                    {product.list.map((img, index) => (
                      <li
                        data-target="#single-product-slider"
                        data-slide-to={index + 1}
                      >
                        <img src={img} alt="" class="img-fluid" />
                      </li>
                    ))}
                  </ol>

                  <a
                    class="carousel-control-prev"
                    href="#single-product-slider"
                    role="button"
                    data-slide="prev"
                  >
                    <span aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a
                    class="carousel-control-next"
                    href="#single-product-slider"
                    role="button"
                    data-slide="next"
                  >
                    <span aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div> */}
            </div>

            <div class="col-md-7">
              <div class="single-product-details mt-5 mt-lg-0">
                <h2>{product.name}</h2>
                <div class="sku_wrapper mb-4">
                  SKU: <span class="text-muted">{productDetail.serialNumber} </span>
                </div>

                <hr />

                <h3 class="product-price">
                  {productDetail.price} đ<del></del>
                </h3>

                <p class="product-description my-4 ">
                  {productDetail.brief_description}
                </p>
                <div class="quantity d-flex align-items-center">
                  <div className="mr-3">
                    <button
                      style={{ color: "black", cursor: cursor }}
                      className="btn btn-light mr-3"
                      onClick={
                        quantity > 1 ? handleDecreaseQuantity : undefined
                      }
                      onMouseOver={handleCursorOver}
                    >
                      {" "}
                      -{" "}
                    </button>
                    {quantity}
                    <button
                      style={{ color: "black" }}
                      className="btn btn-light ml-3"
                      onClick={handleIncreaseQuantity}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <button
                    class="btn btn-main rounded-pill btn-small"
                    type="submit"
                  >
                    Add to cart
                  </button>
                </div>

                {/* Phần chọn color sản phẩm */}
                {productColors.length !== 0 && !categoriesNoSizesAndColors.includes(product.category)
                  ? (
                    <div class="color-swatches mt-4 d-flex align-items-center">
                      <span class="font-weight-bold text-capitalize product-meta-title">
                        Color:
                      </span>
                      <ul class="list-inline mb-0">
                        {productColors.map((color) => (
                          <li class="list-inline-item">
                            <button
                              id="product-color-option"
                              className="rounded-pill"
                              style={{ backgroundColor: color }}
                              value={color}
                              onClick={handleGetProductDetailByColorAndSize}
                            ></button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : undefined}
                {/* Hết phần chọn color sản phẩm */}

                {/* Phần chọn size sản phẩm */}
                {productSizes.length !== 0 && !categoriesNoSizesAndColors.includes(product.category)
                  ? (
                    <div class="product-size d-flex align-items-center mt-4">
                      <span class="font-weight-bold text-capitalize product-meta-title">
                        Size:
                      </span>
                      <select onChange={handleChoosingSize} class="form-control">
                        {productSizes.map((size) => (
                          <option value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  ) : undefined}
                {/* Hết phần chọn size sản phẩm */}

                <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Categories :
                    </span>
                    <a href="#">{product.category}</a>
                  </div>
                </div>

                <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <h2>{stock} left in stock</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <nav class="product-info-tabs wc-tabs mt-5 mb-5">
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                  <a
                    class="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Description
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Additional Information
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Reviews(2)
                  </a>
                </div>
              </nav>

              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productDetail.full_description,
                    }}
                  />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <table>
                    {product.manufacturer ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>Manufacturer</strong>
                        </th>
                        <td>
                          <td id="information-value">{product.manufacturer}</td>
                        </td>
                      </tr>
                    ) : undefined}
                    {productDetail.weight && productDetail.weight < 1 ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>Weight</strong>
                        </th>
                        <td>
                          <td id="information-value">{productDetail.weight * 1000} g</td>
                        </td>
                      </tr>
                    ) : undefined}
                    {productDetail.weight && productDetail.weight >= 1 ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>Weight</strong>
                        </th>
                        <td>
                          <td id="information-value">{productDetail.weight} kg</td>
                        </td>
                      </tr>
                    ) : undefined}
                    {productDetail.material ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>Material</strong>
                        </th>
                        <td>
                          <td id="information-value">{productDetail.material}</td>
                        </td>
                      </tr>
                    ) : undefined}
                    {productDetail.cpu ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>CPU</strong>
                        </th>
                        <td>
                          <td id="information-value">{productDetail.cpu}</td>
                        </td>
                      </tr>
                    ) : undefined}
                    {productDetail.gpu ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>GPU</strong>
                        </th>
                        <td id="information-value">{productDetail.gpu}</td>
                      </tr>
                    ) : undefined}
                    {productDetail.ram ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>RAM</strong>
                        </th>
                        <td>
                          <td id="information-value">{productDetail.ram}</td>
                        </td>
                      </tr>
                    ) : undefined}
                    {productDetail.storageDrive ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>Storage Drive</strong>
                        </th>
                        <td>
                          <td id="information-value">{productDetail.storageDrive}</td>
                        </td>
                      </tr>
                    ) : undefined}
                    {productDetail.display ? (
                      <tr class="list-unstyled info-desc">
                        <th className="d-flex">
                          <strong>Display</strong>
                        </th>
                        <td>
                          <td id="information-value">{productDetail.display}</td>
                        </td>
                      </tr>
                    ) : undefined}
                  </table>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <div class="row">
                    <div class="col-lg-7">
                      <div class="media review-block mb-4">
                        <img
                          src="assets/images/avater-1.jpg"
                          alt="reviewimg"
                          class="img-fluid mr-4"
                        />
                        <div class="media-body">
                          <div class="product-review">
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                          </div>
                          <h6>
                            Therichpost{" "}
                            <span class="text-sm text-muted font-weight-normal ml-3">
                              -June 23, 2019
                            </span>
                          </h6>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ipsum suscipit consequuntur in, perspiciatis
                            laudantium ipsa fugit. Iure esse saepe error dolore
                            quod.
                          </p>
                        </div>
                      </div>

                      <div class="media review-block">
                        <img
                          src="assets/images/avater-2.jpg"
                          alt="reviewimg"
                          class="img-fluid mr-4"
                        />
                        <div class="media-body">
                          <div class="product-review">
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i class="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i class="tf-ion-android-star-outline"></i>
                            </span>
                          </div>
                          <h6>
                            Therichpost{" "}
                            <span class="text-sm text-muted font-weight-normal ml-3">
                              -June 23, 2019
                            </span>
                          </h6>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ipsum suscipit consequuntur in, perspiciatis
                            laudantium ipsa fugit. Iure esse saepe error dolore
                            quod.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-5">
                      <div class="review-comment mt-5 mt-lg-0">
                        <h4 class="mb-3">Add a Review</h4>

                        <form action="#">
                          <div class="starrr"></div>
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Your Name"
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control"
                              placeholder="Your Email"
                            />
                          </div>
                          <div class="form-group">
                            <textarea
                              name="comment"
                              id="comment"
                              class="form-control"
                              cols="30"
                              rows="4"
                              placeholder="Your Review"
                            ></textarea>
                          </div>

                          <a
                            routerLink="/product-single"
                            class="btn btn-main btn-small"
                          >
                            Submit Review
                          </a>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="products related-products section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="title text-center">
                <h2>You may like this</h2>
                <p>The best Online sales to shop these weekend</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-6">
              <div class="product">
                <div class="product-wrap">
                  <a routerLink="/product-single">
                    <img
                      class="img-fluid w-100 mb-3 img-first"
                      src="assets/images/322.jpg"
                      alt="product-img"
                    />
                  </a>
                  <a routerLink="/product-single">
                    <img
                      class="img-fluid w-100 mb-3 img-second"
                      src="assets/images/444.jpg"
                      alt="product-img"
                    />
                  </a>
                </div>

                <span class="onsale">Sale</span>
                <div class="product-hover-overlay">
                  <a href="#">
                    <i class="tf-ion-android-cart"></i>
                  </a>
                  <a href="#">
                    <i class="tf-ion-ios-heart"></i>
                  </a>
                </div>

                <div class="product-info">
                  <h2 class="product-title h5 mb-0">
                    <a routerLink="/product-single">Kirby Shirt</a>
                  </h2>
                  <span class="price">$329.10</span>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-6">
              <div class="product">
                <div class="product-wrap">
                  <a routerLink="/product-single">
                    <img
                      class="img-fluid w-100 mb-3 img-first"
                      src="assets/images/111.jpg"
                      alt="product-img"
                    />
                  </a>
                  <a routerLink="/product-single">
                    <img
                      class="img-fluid w-100 mb-3 img-second"
                      src="assets/images/222.jpg"
                      alt="product-img"
                    />
                  </a>
                </div>

                <span class="onsale">Sale</span>
                <div class="product-hover-overlay">
                  <a href="#">
                    <i class="tf-ion-android-cart"></i>
                  </a>
                  <a href="#">
                    <i class="tf-ion-ios-heart"></i>
                  </a>
                </div>

                <div class="product-info">
                  <h2 class="product-title h5 mb-0">
                    <a routerLink="/product-single">Kirby Shirt</a>
                  </h2>
                  <span class="price">$329.10</span>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-6">
              <div class="product">
                <div class="product-wrap">
                  <a routerLink="/product-single">
                    <img
                      class="img-fluid w-100 mb-3 img-first"
                      src="assets/images/111.jpg"
                      alt="product-img"
                    />
                  </a>
                  <a routerLink="/product-single">
                    <img
                      class="img-fluid w-100 mb-3 img-second"
                      src="assets/images/322.jpg"
                      alt="product-img"
                    />
                  </a>
                </div>

                <span class="onsale">Sale</span>
                <div class="product-hover-overlay">
                  <a href="#">
                    <i class="tf-ion-android-cart"></i>
                  </a>
                  <a href="#">
                    <i class="tf-ion-ios-heart"></i>
                  </a>
                </div>

                <div class="product-info">
                  <h2 class="product-title h5 mb-0">
                    <a routerLink="/product-single">Kirby Shirt</a>
                  </h2>
                  <span class="price">$329.10</span>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-6">
              <div class="product">
                <div class="product-wrap">
                  <a routerLink="/product-single">
                    <img
                      class="img-fluid w-100 mb-3 img-first"
                      src="assets/images/444.jpg"
                      alt="product-img"
                    />
                  </a>
                  <a routerLink="/product-single">
                    <img
                      class="img-fluid w-100 mb-3 img-second"
                      src="assets/images/222.jpg"
                      alt="product-img"
                    />
                  </a>
                </div>

                <span class="onsale">Sale</span>
                <div class="product-hover-overlay">
                  <a href="#">
                    <i class="tf-ion-android-cart"></i>
                  </a>
                  <a href="#">
                    <i class="tf-ion-ios-heart"></i>
                  </a>
                </div>

                <div class="product-info">
                  <h2 class="product-title h5 mb-0">
                    <a routerLink="/product-single">Kirby Shirt</a>
                  </h2>
                  <span class="price">$329.10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default SingleProduct;
