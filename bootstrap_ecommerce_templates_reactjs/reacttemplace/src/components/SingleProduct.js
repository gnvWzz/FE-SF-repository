import React, { useEffect, useState } from 'react';
function SingleProduct() {

    const [quantity, setQuantity] = useState(1);
    const [cursor, setCursor] = useState("");

    function handleDecreaseQuantity() {
        setQuantity(quantity - 1);
        if (quantity === 2) {
            setCursor("not-allowed")
        }
    }

    function handleIncreaseQuantity() {
        setQuantity(quantity + 1);
    }

    function handleCursorOver() {
        if (quantity > 1) {
            setCursor("pointer")
        } else {
            setCursor("not-allowed")
        }
    }

    return (
        <div className="single-product-container">
            <section class="page-header">
                <div class="overly"></div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="content text-center">
                                <h1 class="mb-3">Product Single</h1>
                                <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p>

                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb bg-transparent justify-content-center">
                                        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Product Single</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="single-product">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="single-product-slider">
                                <div class="carousel slide" data-ride="carousel" id="single-product-slider">
                                    <div class="carousel-inner" style={{ textAlign: 'center' }}>
                                        <div class="carousel-item active">
                                            <img src="assets/images/product-3.jpg" alt="" class="img-fluid" />
                                        </div>
                                        <div class="carousel-item">
                                            <img src="assets/images/product-2.jpg" alt="" class="img-fluid" />
                                        </div>
                                        <div class="carousel-item ">
                                            <img src="assets/images/product-1.jpg" alt="" class="img-fluid" />
                                        </div>
                                    </div>

                                    <ol class="carousel-indicators">
                                        <li data-target="#single-product-slider" data-slide-to="0" class="active">
                                            <img src="assets/images/product-3.jpg" alt="" class="img-fluid" />
                                        </li>
                                        <li data-target="#single-product-slider" data-slide-to="1">
                                            <img src="assets/images/product-2.jpg" alt="" class="img-fluid" />
                                        </li>
                                        <li data-target="#single-product-slider" data-slide-to="2">
                                            <img src="assets/images/product-1.jpg" alt="" class="img-fluid" />
                                        </li>
                                    </ol>

                                    <a class="carousel-control-prev" href="#single-product-slider" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#single-product-slider" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-7">
                            <div class="single-product-details mt-5 mt-lg-0">
                                <h2>Eclipse Crossbody</h2>
                                <div class="sku_wrapper mb-4">
                                    SKU: <span class="text-muted">AB1563456789 </span>
                                </div>

                                <hr />

                                <h3 class="product-price">$300 <del>$119.90</del></h3>

                                <p class="product-description my-4 ">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum ipsum dicta quod, quia doloremque aut deserunt commodi quis. Totam a consequatur beatae nostrum, earum consequuntur? Eveniet consequatur ipsum dicta recusandae.
                                </p>
                                <div class="quantity d-flex align-items-center">
                                    <div className='mr-3'>
                                        <button style={{ color: "black", cursor: cursor }} className="btn btn-light mr-3" onClick={quantity > 1 ? handleDecreaseQuantity : undefined} onMouseOver={handleCursorOver}> - </button>
                                        {quantity}
                                        <button style={{ color: "black" }} className="btn btn-light ml-3" onClick={handleIncreaseQuantity}> + </button>
                                    </div>
                                    <button class="btn btn-main rounded-pill btn-small" type='submit'>Add to cart</button>
                                </div>
                                <div class="color-swatches mt-4 d-flex align-items-center">
                                    <span class="font-weight-bold text-capitalize product-meta-title">color:</span>
                                    <ul class="list-inline mb-0">
                                        <li class="list-inline-item">
                                            <a routerLink="/product-single" class="bg-info"></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a routerLink="/product-single" class="bg-dark"></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a routerLink="/product-single" class="bg-danger"></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a routerLink="/product-single" class="bg-success"></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a routerLink="/product-single" class="bg-primary"></a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a routerLink="/product-single" class="bg-warning"></a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="product-size d-flex align-items-center mt-4">
                                    <span class="font-weight-bold text-capitalize product-meta-title">Size:</span>
                                    <select class="form-control">
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </select>
                                </div>

                                <div class="products-meta mt-4">
                                    <div class="product-category d-flex align-items-center">
                                        <span class="font-weight-bold text-capitalize product-meta-title">Categories :</span>
                                        <a href="#">Products , </a>
                                        <a href="#">Soap</a>
                                    </div>

                                    <div class="product-share mt-5">
                                        <ul class="list-inline">
                                            <li class="list-inline-item">
                                                <a href="#"><i class="tf-ion-social-facebook"></i></a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#"><i class="tf-ion-social-twitter"></i></a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#"><i class="tf-ion-social-linkedin"></i></a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#"><i class="tf-ion-social-pinterest"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-lg-12">
                            <nav class="product-info-tabs wc-tabs mt-5 mb-5">
                                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Description</a>
                                    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Additional Information</a>
                                    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Reviews(2)</a>
                                </div>
                            </nav>

                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>

                                    <h4>Product Features</h4>

                                    <ul class="">
                                        <li>Mapped with 3M™ Thinsulate™ Insulation [40G Body / Sleeves / Hood]</li>
                                        <li>Embossed Taffeta Lining</li>
                                        <li>DRYRIDE Durashell™ 2-Layer Oxford Fabric [10,000MM, 5,000G]</li>
                                    </ul>

                                </div>
                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                                    <ul class="list-unstyled info-desc">
                                        <li class="d-flex">
                                            <strong>Weight </strong>
                                            <span>400 g</span>
                                        </li>
                                        <li class="d-flex">
                                            <strong>Dimensions </strong>
                                            <span>10 x 10 x 15 cm</span>
                                        </li>
                                        <li class="d-flex">
                                            <strong>Materials</strong>
                                            <span >60% cotton, 40% polyester</span>
                                        </li>
                                        <li class="d-flex">
                                            <strong>Color </strong>
                                            <span>Blue, Gray, Green, Red, Yellow</span>
                                        </li>
                                        <li class="d-flex">
                                            <strong>Size</strong>
                                            <span>L, M, S, XL, XXL</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <div class="row">
                                        <div class="col-lg-7">
                                            <div class="media review-block mb-4">
                                                <img src="assets/images/avater-1.jpg" alt="reviewimg" class="img-fluid mr-4" />
                                                <div class="media-body">
                                                    <div class="product-review">
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                    </div>
                                                    <h6>Therichpost <span class="text-sm text-muted font-weight-normal ml-3">-June 23, 2019</span></h6>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum suscipit consequuntur in, perspiciatis laudantium ipsa fugit. Iure esse saepe error dolore quod.</p>
                                                </div>
                                            </div>

                                            <div class="media review-block">
                                                <img src="assets/images/avater-2.jpg" alt="reviewimg" class="img-fluid mr-4" />
                                                <div class="media-body">
                                                    <div class="product-review">
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                        <span><i class="tf-ion-android-star"></i></span>
                                                        <span><i class="tf-ion-android-star-outline"></i></span>
                                                    </div>
                                                    <h6>Therichpost <span class="text-sm text-muted font-weight-normal ml-3">-June 23, 2019</span></h6>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum suscipit consequuntur in, perspiciatis laudantium ipsa fugit. Iure esse saepe error dolore quod.</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-lg-5">
                                            <div class="review-comment mt-5 mt-lg-0">
                                                <h4 class="mb-3">Add a Review</h4>

                                                <form action="#">
                                                    <div class="starrr"></div>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" placeholder="Your Name" />
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="email" class="form-control" placeholder="Your Email" />
                                                    </div>
                                                    <div class="form-group">
                                                        <textarea name="comment" id="comment" class="form-control" cols="30" rows="4" placeholder="Your Review"></textarea>
                                                    </div>

                                                    <a routerLink="/product-single" class="btn btn-main btn-small">Submit Review</a>
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
                        <div class="col-lg-3 col-6" >
                            <div class="product">
                                <div class="product-wrap">
                                    <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                                    <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-second" src="assets/images/444.jpg" alt="product-img" /></a>
                                </div>

                                <span class="onsale">Sale</span>
                                <div class="product-hover-overlay">
                                    <a href="#"><i class="tf-ion-android-cart"></i></a>
                                    <a href="#"><i class="tf-ion-ios-heart"></i></a>
                                </div>

                                <div class="product-info">
                                    <h2 class="product-title h5 mb-0"><a routerLink="/product-single">Kirby Shirt</a></h2>
                                    <span class="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-6" >
                            <div class="product">
                                <div class="product-wrap">
                                    <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                                    <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                                </div>

                                <span class="onsale">Sale</span>
                                <div class="product-hover-overlay">
                                    <a href="#"><i class="tf-ion-android-cart"></i></a>
                                    <a href="#"><i class="tf-ion-ios-heart"></i></a>
                                </div>

                                <div class="product-info">
                                    <h2 class="product-title h5 mb-0"><a routerLink="/product-single">Kirby Shirt</a></h2>
                                    <span class="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div class="col-lg-3 col-6" >
                            <div class="product">
                                <div class="product-wrap">
                                    <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                                    <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-second" src="assets/images/322.jpg" alt="product-img" /></a>
                                </div>

                                <span class="onsale">Sale</span>
                                <div class="product-hover-overlay">
                                    <a href="#"><i class="tf-ion-android-cart"></i></a>
                                    <a href="#"><i class="tf-ion-ios-heart"></i></a>
                                </div>

                                <div class="product-info">
                                    <h2 class="product-title h5 mb-0"><a routerLink="/product-single">Kirby Shirt</a></h2>
                                    <span class="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-6">
                            <div class="product">
                                <div class="product-wrap">
                                    <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-first" src="assets/images/444.jpg" alt="product-img" /></a>
                                    <a routerLink="/product-single"><img class="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                                </div>

                                <span class="onsale">Sale</span>
                                <div class="product-hover-overlay">
                                    <a href="#"><i class="tf-ion-android-cart"></i></a>
                                    <a href="#"><i class="tf-ion-ios-heart"></i></a>
                                </div>

                                <div class="product-info">
                                    <h2 class="product-title h5 mb-0"><a routerLink="/product-single">Kirby Shirt</a></h2>
                                    <span class="price">
                                        $329.10
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default SingleProduct;