function Shop() {
  return (
    <div className="shop-container">
      <section className="products-shop section">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div class="bg-light border-right min-vh-50" id="sidebar-wrapper">
                <div class="sidebar-heading">
                  <h4>Categories</h4>{" "}
                </div>
                <div class="list-group list-group-flush" id="logsContainer">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action bg-light"
                  >
                    Máy tính
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action bg-light"
                  >
                    Đồ chơi
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action bg-light"
                  >
                    Đồng hồ
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action bg-light"
                  >
                    Quần Áo
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action bg-light"
                  >
                    Giày dép
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action bg-light"
                  >
                    Túi xách
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action bg-light"
                  >
                    Phụ kiện
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action bg-light"
                  >
                    Thiết bị điện tử
                  </a>
                </div>
              </div>
              <section class="widget widget-popular mb-5 mt-2">
                <h3 class="widget-title mb-4 h4">Popular Products</h3>
                <a class="popular-products-item media" href="/product-single">
                  <img
                    src="assets/images/p-1.jpg"
                    alt=""
                    class="img-fluid mr-4"
                  />
                  <div class="media-body">
                    <h6>
                      Contrast <br />
                      Backpack
                    </h6>
                    <span class="price">$45</span>
                  </div>
                </a>
                <a class="popular-products-item media" href="/product-single">
                  <img
                    src="assets/images/p-2.jpg"
                    alt=""
                    class="img-fluid mr-4"
                  />
                  <div class="media-body">
                    <h6>
                      Hoodie with <br />
                      Logo
                    </h6>
                    <span class="price">$45</span>
                  </div>
                </a>
                <a class="popular-products-item media" href="/product-single">
                  <img
                    src="assets/images/p-3.jpg"
                    alt=""
                    class="img-fluid mr-4"
                  />
                  <div class="media-body">
                    <h6>
                      Traveller
                      <br />
                      Backpack
                    </h6>
                    <span class="price">$45</span>
                  </div>
                </a>
              </section>
            </div>
            {/* Đây là phần product listing */}
            <div className="col-md-10">
              <div className="row align-items-center">
                <div className="col-lg-12 mb-4 mb-lg-0">
                  <div className="section-title">
                    <h2 className="d-block text-left-sm">Shop</h2>

                    <div className="heading d-flex justify-content-between mb-5">
                      <p className="result-count mb-0">
                        {" "}
                        Showing 1–6 of 17 results
                      </p>
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
                <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
                  <div className="product">
                    <div className="product-wrap">
                      <a href="/product-single">
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="assets/images/322.jpg"
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
                        <a href="/product-single">Floral Kirby</a>
                      </h2>
                      <span className="price">$329.10</span>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <nav aria-label="Page navigation">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Shop;
