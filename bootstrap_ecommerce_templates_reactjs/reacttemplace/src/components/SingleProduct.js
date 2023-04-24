import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_URL, STORE_URL } from "./URLS/url";

export default function SingleProduct() {
  const [quantity, setQuantity] = useState(1);
  const [cursor, setCursor] = useState("");
  const { product_name } = useParams(); 
  const[productYouLikeThis, setProductYouLikeThis] = useState([]);
  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const [productColors, setProductColors] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [categoriesNoSizesAndColors, setCategoriseNoSizesAndColors] = useState([
    "Computer",
    "Electronics",
    "Toy",
    "Watch",
    "HandBag",
  ]);
  const [visible, setVisible] = useState("none");
  const [stock, setStock] = useState();
  const [serialNumber, setSerialNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [priceList, setPriceList] = useState([]);
  const [choosingColor, setChoosingColor] = useState("");
  const [choosingSize, setChoosingSize] = useState("");
  const [imgList2, setImgList2] = useState([]);
  const [cursorStoreImage, setCursorStoreImage] = useState("")
  const [shop, setShop] = useState({
    name: "",
    img: ""
  })
  let isStop = false;
  const url = PRODUCT_URL;
  const url2 = STORE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    // Long xoa localStorage cua Long
    localStorage.removeItem("sort_price");
    localStorage.removeItem("sort_name");
    localStorage.removeItem("min_price");
    localStorage.removeItem("max_price");
    // 
    if (localStorage.getItem("token") !== null) {
      if (!isStop) {
        setProductName(product_name.replace("%20", " "));
        getData();
        getproductYouLikeThis();
      }
    } else {
      navigate("/login");
    }
    return () => {
      isStop = true;
    };
  }, [productName]);

  const getData = () => {
    const tempList = [];
    const tempColors = [];
    const tempList2 = [];
    axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      url: `${url}/name-product/${productName}`,
      method: "GET",
    })
      .then((res) => {
        setProduct(res.data);
        setShop({
          ...shop,
          name: res.data.storeName,
          img: res.data.storeImage
        })
        generateProductColors(res.data);
        generateProductSizes(res.data);
        setProductDetail(res.data.productSFDetailDtos[0]);
        setStock(
          JSON.parse(res.data.productSFDetailDtos[0].size_color_img_quantity)
            .quantity
        );
        setPrice(res.data.priceListDtos[0].price);
        setSerialNumber(res.data.productSFDetailDtos[0].serialNumber);
        setQuantity(1);
        setPriceList(res.data.priceListDtos);
        setChoosingColor(
          JSON.parse(res.data.productSFDetailDtos[0].size_color_img_quantity)
            .color
        );
        setChoosingSize(
          JSON.parse(res.data.productSFDetailDtos[0].size_color_img_quantity)
            .size
        );
        res.data.productSFDetailDtos.map((p) => {
          JSON.parse(p.size_color_img_quantity).img.map((i) => {
            const temp = {
              color: "",
              img: "",
            };
            temp.color = JSON.parse(p.size_color_img_quantity).color;
            temp.img = i;
            let isExisted = tempList.some((item) => item.img === temp.img);
            if (!isExisted) {
              tempList.push(temp);
            }
          });
        });

        tempList.map((ele) => {
          if (!tempColors.some((item) => item === ele.color)) {
            tempColors.push(ele.color);
          }
        });
        tempColors.map((tempColor) => {
          const imgs_to_color = {
            color: tempColor,
            img: [],
          };
          tempList2.push(imgs_to_color);
        });
        tempList.map((t1) => {
          tempList2.map((t2) => {
            if (t1.color === t2.color) {
              t2.img.push(t1.img);
            }
          });
        });
        setImgList2(tempList2);
      })
      .catch((err) => {
        throw err;
      });
  };

  const getproductYouLikeThis = () =>{
    axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      url: `${url}/random-single-product/${product_name}`,
      method: "GET",
    })
      .then((res) => {
       if(res.status === 200){
        setProductYouLikeThis(res.data);
        console.log(res.data);
       }
      })
      .catch((err) => {
        throw err;
      });
  }

  useEffect(() => {
    if (priceList) {
      for (let i = 0; i < priceList.length; i++) {
        if (
          quantity <= priceList[i].toQuantity &&
          quantity >= priceList[i].fromQuantity
        ) {
          setPrice(priceList[i].price);
        }
      }
    }
  }, [quantity]);



  const generateProductColors = (data) => {
    let colors = [];
    data.productSFDetailDtos.map((p) => {
      if (!colors.includes(JSON.parse(p.size_color_img_quantity).color)) {
        colors.push(JSON.parse(p.size_color_img_quantity).color);
      }
    });
    setProductColors(colors);
  };

  const generateProductSizes = (data) => {
    let sizes = [];
    data.productSFDetailDtos.map((p) => {
      if (!sizes.includes(JSON.parse(p.size_color_img_quantity).size)) {
        sizes.push(JSON.parse(p.size_color_img_quantity).size);
      }
    });
    setProductSizes(sizes);
  };

  function handleDecreaseQuantity() {
    setQuantity(parseInt(quantity) - 1);
    if (quantity === 2) {
      setCursor("not-allowed");
    }
  }

  function handleIncreaseQuantity() {
    setQuantity(parseInt(quantity) + 1);
    if (parseInt(quantity) >= stock) {
      setQuantity(stock);
    }
  }

  function handleCursorOver() {
    if (quantity > 1) {
      setCursor("pointer");
    } else {
      setCursor("not-allowed");
    }
  }

  const handleCursorOverYouLikeThis = (e) => {
    setCursor("pointer");
  };

  const handleGetProductDetailByColorAndSize = async (e) => {
    const c = e.currentTarget.getAttribute("value");
    await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      url: `${url}/find-product-detail-by-color-and-size/${c}/${choosingSize}/${productName}`,
      method: "GET",
    })
      .then((res) => {
        setProductDetail(res.data);
        setStock(JSON.parse(res.data.size_color_img_quantity).quantity);
        setQuantity(1);
        setSerialNumber(res.data.serialNumber);

        setChoosingColor(c);
        setStock(JSON.parse(res.data.size_color_img_quantity).quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChoosingSize = async (e) => {
    const s = e.target.value;
    await axios({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      url: `${url}/find-product-detail-by-color-and-size/${choosingColor}/${s}/${productName}`,
      method: "GET",
    })
      .then((res) => {
        setProductDetail(res.data);
        setStock(JSON.parse(res.data.size_color_img_quantity).quantity);
        setQuantity(1);
        setSerialNumber(res.data.serialNumber);

        setChoosingSize(s);
        setStock(JSON.parse(res.data.size_color_img_quantity).quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function showCarousel() {
    if (imgList2 && choosingColor) {
      const imgListToChoseColor = imgList2.filter((ele) => {
        if (ele.color === choosingColor) {
          return ele;
        }
      });
      const firstList = imgListToChoseColor;
      const secondList = [];
      for (var i = 1; i < imgListToChoseColor[0].img.length; i++) {
        secondList.push(imgListToChoseColor[0].img[i]);
      }

      if (imgListToChoseColor[0].img.length > 1) {
        return (
          <div className="single-product-slider">
            <div
              className="carousel slide"
              data-ride="carousel"
              id="single-product-slider"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={firstList[0].img[0].url}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                {secondList.map((i) => (
                  <div className="carousel-item">
                    <img src={i.url} alt="" className="img-fluid" />
                  </div>
                ))}
              </div>

              <ol className="carousel-indicators">
                <li
                  data-target="#single-product-slider"
                  data-slide-to="0"
                  className="active"
                >
                  <img
                    src={firstList[0].img[0].url}
                    alt=""
                    className="img-fluid"
                  />
                </li>
                {secondList.map((i, index) => (
                  <li
                    data-target="#single-product-slider"
                    data-slide-to={index + 1}
                  >
                    <img src={i.url} alt="" className="img-fluid" />
                  </li>
                ))}
              </ol>

              <a
                className="carousel-control-prev"
                href="#single-product-slider"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#single-product-slider"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        );
      } else {
        return (
          <div className="product-preview-image">
            <img
              style={{ height: "667px", width: "445px" }}
              src={firstList[0].img[0].url}
              alt=""
            />
          </div>
        );
      }
    } else if (imgList2 && choosingColor === undefined) {
      const listFirst = imgList2;
      const listSecond = [];
      for (var i = 1; i < listFirst[0].img.length; i++) {
        listSecond.push(listFirst[0].img[i]);
      }
      if (imgList2[0].img.length > 1) {
        return (
          <div className="single-product-slider">
            <div
              className="carousel slide"
              data-ride="carousel"
              id="single-product-slider"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={listFirst[0].img[0].url}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                {listSecond.map((i) => (
                  <div className="carousel-item">
                    <img src={i.url} alt="" className="img-fluid" />
                  </div>
                ))}
              </div>

              <ol className="carousel-indicators">
                <li
                  data-target="#single-product-slider"
                  data-slide-to="0"
                  className="active"
                >
                  <img
                    src={listFirst[0].img[0].url}
                    alt=""
                    className="img-fluid"
                  />
                </li>
                {listSecond.map((i, index) => (
                  <li
                    data-target="#single-product-slider"
                    data-slide-to={index + 1}
                  >
                    <img src={i.url} alt="" className="img-fluid" />
                  </li>
                ))}
              </ol>

              <a
                className="carousel-control-prev"
                href="#single-product-slider"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#single-product-slider"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        );
      } else {
        return (
          <div className="product-preview-image">
            <img
              style={{ height: "667px", width: "445px" }}
              src={listFirst[0].img[0].url}
              alt=""
            />
          </div>
        );
      }
    }
  }

  const handleChangeQuantity = (event) => {
    if (parseInt(event.target.value) > stock) {
      setQuantity(stock);
    } else if (event.target.value <= stock && event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    } else if (event.target.value < 0) {
      setQuantity(1);
    }
  };

  function handleAddToCart() {
    navigate("/cart", { state: { serialNumber, price, quantity } });
  }

  function showPrice() {
    if (price) {
      return <h3 className="product-price">{formatCurrency(price)} đ</h3>;
    } else {
      return undefined;
    }
  }

  function showPriceTable() {
    if (priceList) {
      if (priceList.length !== 1) {
        return (
          <div className="mt-5">
            <table id="product-price-table-information">
              <tr className="product-price-table-tr">
                <th className="product-price-table-th" colSpan={3}>
                  PRICE CORRESPONDING TO QUANTITY RANGE
                </th>
              </tr>
              <tr className="product-price-table-tr">
                <th className="product-price-table-th">Quantity from</th>
                <th className="product-price-table-th">Quantity to</th>
                <th className="product-price-table-th">Price</th>
              </tr>
              {priceList.map((ele) => (
                <tr className="product-price-table-tr">
                  <td className="product-price-table-td">{ele.fromQuantity}</td>
                  {ele.toQuantity !== Number.MAX_SAFE_INTEGER ? (
                    <td className="product-price-table-td">{ele.toQuantity}</td>
                  ) : (
                    <td className="product-price-table-td">&infin;</td>
                  )}
                  <td className="product-price-table-td">
                    {formatCurrency(ele.price)}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        );
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  function showStock() {
    if (stock) {
      return <h2>{stock} left in stock</h2>;
    } else {
      return undefined;
    }
  }

  const handleChoosingQuantity = () => {
    return (
      <div>
        <button
          style={{ color: "black", cursor: cursor }}
          className="btn btn-light mr-3"
          onClick={quantity > 1 ? handleDecreaseQuantity : undefined}
          onMouseOver={handleCursorOver}
        >
          {" "}
          -{" "}
        </button>
        <input
          type="number"
          onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
          style={{ width: 120, textAlign: "center" }}
          value={quantity}
          onChange={handleChangeQuantity}
          onWheel={(e) => e.target.blur()}
        ></input>
        <button
          style={{ color: "black" }}
          className="btn btn-light ml-3"
          onClick={handleIncreaseQuantity}
        >
          {" "}
          +{" "}
        </button>
      </div>
    );
  };

  function showColorsOptions() {
    return productColors.map((color) => (
      <li className="list-inline-item">
        <button
          id="product-color-option"
          className="rounded-pill"
          style={{ backgroundColor: color }}
          value={color}
          onClick={handleGetProductDetailByColorAndSize}
        ></button>
      </li>
    ));
  }

  function showSizesOptions() {
    return productSizes.map((size) => <option value={size}>{size}</option>);
  }

  function handleSizesSelecting() {
    return productSizes.length !== 0 &&
      !categoriesNoSizesAndColors.includes(product.category) ? (
      <div className="product-size d-flex align-items-center mt-4">
        <span className="font-weight-bold text-capitalize product-meta-title">
          Size:
        </span>
        <select onChange={handleChoosingSize} className="form-control">
          {showSizesOptions()}
        </select>
      </div>
    ) : undefined;
  }

  function handleColorsSelecting() {
    return productColors.length !== 0 &&
      !categoriesNoSizesAndColors.includes(product.category) ? (
      <div className="color-swatches mt-4 d-flex align-items-center">
        <span className="font-weight-bold text-capitalize product-meta-title">
          Color:
        </span>
        <ul className="list-inline mb-0">{showColorsOptions()}</ul>
      </div>
    ) : undefined;
  }

  function showProductInformationTable() {
    return (
      <table id="information-table">
        {product.manufacturer ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>Manufacturer</strong>
            </th>
            <td id="information-value">{product.manufacturer}</td>
          </tr>
        ) : undefined}
        {productDetail.weight && productDetail.weight < 1 ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>Weight</strong>
            </th>
            <td id="information-value">{productDetail.weight * 1000} g</td>
          </tr>
        ) : undefined}
        {productDetail.weight && productDetail.weight >= 1 ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>Weight</strong>
            </th>
            <td id="information-value">{productDetail.weight} kg</td>
          </tr>
        ) : undefined}
        { }
        {productDetail.material ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>Material</strong>
            </th>
            <td id="information-value">{productDetail.material}</td>
          </tr>
        ) : undefined}
        {productDetail.cpu ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>CPU</strong>
            </th>
            <td id="information-value">{productDetail.cpu}</td>
          </tr>
        ) : undefined}
        {productDetail.gpu ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>GPU</strong>
            </th>
            <td id="information-value">{productDetail.gpu}</td>
          </tr>
        ) : undefined}
        {productDetail.ram ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>RAM</strong>
            </th>
            <td id="information-value">{productDetail.ram}</td>
          </tr>
        ) : undefined}
        {productDetail.storageDrive ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>Storage Drive</strong>
            </th>
            <td id="information-value">{productDetail.storageDrive}</td>
          </tr>
        ) : undefined}
        {productDetail.display ? (
          <tr className="list-unstyled info-desc">
            <th className="information-key ">
              <strong>Display</strong>
            </th>
            <td id="information-value">{productDetail.display}</td>
          </tr>
        ) : undefined}
      </table>
    );
  }

  const formatCurrency = (currency) => {
    let intCurrency = currency;
    const format = intCurrency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return format;
  };

  const handleGotoTop = (e) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible("inline")
    }
    else if (scrolled <= 300) {
      setVisible("none")
    }
  };

  window.addEventListener("scroll", toggleVisible);

  const handleChatWithThisStore = (e) => {
    //navigate to chat with this store
  }

  const handleNavigateToStoreDetail = (e) => {
    const productName =  product_name ;
    const storeName = shop.name;
    const storeImg = shop.img;
    navigate(`/shopstore`, {state :{productName,storeName,storeImg}})
  }

  const handleChangeCursorStoreImage = (e) => {
    setCursorStoreImage("pointer")
  }

  const showStoreInformation = () => {
    if (shop.name && shop.img) {
      return (
        <table>
          <tr>
            <td rowSpan={2}>
              <img onClick={handleNavigateToStoreDetail} onMouseOver={handleChangeCursorStoreImage} className="ml-0" src={shop.img} style={{ width: "150px", height: "150px", cursor: cursorStoreImage }}></img>
            </td>
            <td style={{ textAlign: "center" }} colSpan={2}>
              <h3>{shop.name}</h3>
            </td>
          </tr>
          <tr>
            <td>
              <button className="btn btn-main" style={{ width: "200px", height: "50px", fontSize: "15px" }} onClick={handleChatWithThisStore}>Chat Now</button>
            </td>
            <td>
              <button className="btn btn-secondary" style={{ width: "200px", height: "50px", fontSize: "15px" }} onClick={handleNavigateToStoreDetail}>Visit This Store</button>
            </td>
          </tr>
        </table>
      )
    } else {
      return (
        undefined
      )
    }
  }

  const handleYouLikeThis = (e) =>{
    navigate(`/single-product/${e.currentTarget.getAttribute("value")}`)
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  const showProductRandomYouLikeThis = () =>{
    return(
      productYouLikeThis.map((product) =>(
        <div className="col-lg-3 col-6">
        <div className="product">
          <div className="product-wrap">
            <a routerLink="/product-single">
              <img
                className="img-fluid w-100 mb-3 img-first"
                src={JSON.parse(product.productSFDetailDtos[0].size_color_img_quantity).img[0].url}
                alt="product-img"
                onClick={handleYouLikeThis}
                style={{ cursor: cursor }}
                onMouseOver={handleCursorOverYouLikeThis}
                value = {product.name}
              />
            </a>
          </div>
          
          <div className="product-info">
            <h2 className=" h5 mb-0">
            <button class="product-you-like-this mb-0" onClick={handleYouLikeThis} value={product.name}>{product.name}</button>
            </h2>
            <span className="price">{formatCurrency(product.priceListDtos[0].price)}</span>
          </div>
        </div>
      </div>
      ))

     
    )
   
  }

  if (!product) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  } else {
    return (
      <div className="single-product-container">
        <button
          className="button-go-to-top"
          style={{ borderColor: "#fb5c42", backgroundColor: "white", display: visible }}
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
        <section className="single-product">
          <div className="container">
            <div className="row">
              <div className="col-md-5">{showCarousel()}</div>

              <div className="col-md-7">
                <div className="single-product-details mt-5 mt-lg-0">
                  <h2>{product.name}</h2>
                  <div className="sku_wrapper mb-4">
                    SKU:{" "}
                    <span className="text-muted">
                      {productDetail.serialNumber}{" "}
                    </span>
                  </div>

                  <hr />

                  <div>{showPrice()}</div>
                  <div>{showPriceTable()}</div>

                  <p className="product-description my-4 mt-5 ">
                    {productDetail.briefDescription}
                  </p>
                  <div className="quantity d-flex align-items-center">
                    <div className="mr-3">{handleChoosingQuantity()}</div>
                    <button
                      className="btn btn-main rounded-pill btn-small"
                      type="submit"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>
                  </div>
                  {/* Phần chọn color sản phẩm */}
                  {handleColorsSelecting()}
                  {/* Hết phần chọn color sản phẩm */}

                  {/* Phần chọn size sản phẩm */}
                  {handleSizesSelecting()}
                  {/* Hết phần chọn size sản phẩm */}

                  <div className="products-meta mt-4">
                    <div className="product-category d-flex align-items-center">
                      <span className="font-weight-bold text-capitalize product-meta-title">
                        Categories :
                      </span>
                      <a href="#">{product.category}</a>
                    </div>
                  </div>

                  <div className="products-meta mt-4">
                    <div className="product-category d-flex align-items-center">
                      {showStock()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5" style={{ border: "1px solid lightgrey", width: "100%", marginLeft: "1px" }}>
              <div className="col-md-5">
                {showStoreInformation()}
              </div>
              <div className="col-md-7">

              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <nav className="product-info-tabs wc-tabs mt-5 mb-5">
                  <div
                    className="nav nav-tabs nav-fill"
                    id="nav-tab"
                    role="tablist"
                  >
                    <a
                      className="nav-item nav-link active"
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
                      className="nav-item nav-link"
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
                      className="nav-item nav-link"
                      id="nav-contact-tab"
                      data-toggle="tab"
                      href="#nav-contact"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      Reviews
                    </a>
                  </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productDetail.fullDescription,
                      }}
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    {showProductInformationTable()}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="media review-block mb-4">
                          <img
                            src="assets/images/avater-1.jpg"
                            alt="reviewimg"
                            className="img-fluid mr-4"
                          />
                          <div className="media-body">
                            <div className="product-review">
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                            </div>
                            <h6>
                              Therichpost{" "}
                              <span className="text-sm text-muted font-weight-normal ml-3">
                                -June 23, 2019
                              </span>
                            </h6>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Ipsum suscipit consequuntur in,
                              perspiciatis laudantium ipsa fugit. Iure esse
                              saepe error dolore quod.
                            </p>
                          </div>
                        </div>

                        <div className="media review-block">
                          <img
                            src="assets/images/avater-2.jpg"
                            alt="reviewimg"
                            className="img-fluid mr-4"
                          />
                          <div className="media-body">
                            <div className="product-review">
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                              <span>
                                <i className="tf-ion-android-star"></i>
                              </span>
                              <span>
                                <i className="tf-ion-android-star-outline"></i>
                              </span>
                            </div>
                            <h6>
                              Therichpost{" "}
                              <span className="text-sm text-muted font-weight-normal ml-3">
                                -June 23, 2019
                              </span>
                            </h6>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Ipsum suscipit consequuntur in,
                              perspiciatis laudantium ipsa fugit. Iure esse
                              saepe error dolore quod.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-5">
                        <div className="review-comment mt-5 mt-lg-0">
                          <h4 className="mb-3">Add a Review</h4>

                          <form action="#">
                            <div className="starrr"></div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Your Email"
                              />
                            </div>
                            <div className="form-group">
                              <textarea
                                name="comment"
                                id="comment"
                                className="form-control"
                                cols="30"
                                rows="4"
                                placeholder="Your Review"
                              ></textarea>
                            </div>

                            <a
                              routerLink="/product-single"
                              className="btn btn-main btn-small"
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

        <section className="products related-products section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="title text-center">
                  <h2>You may like this</h2>
                  <p>The best Online sales to shop these weekend</p>
                </div>
              </div>
            </div>
            <div className="row">
              {showProductRandomYouLikeThis()}          
            </div>
          </div>
        </section>
      </div>
    );
  }
}
