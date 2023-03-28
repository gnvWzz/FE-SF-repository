function Checkout() {
    return (
        <div className="checkout-container">
            <section class="page-header">
            <div class="overly"></div>   
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                <div class="content text-center">
                    <h1 class="mb-3">Checkout</h1>
                    <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p>
        
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </nav>
                </div>
                </div>
            </div>
            </div>
        </section>
        <div class="page-wrapper">
            <div class="checkout shopping">
                <div class="container">
                <div class="row">
                    <div class="col-lg-8 pr-5">
                        <div class="coupon-notice " data-toggle="modal" data-target="#coupon-modal">
                            <div class="bg-light p-3">
                                Have a coupon? <a href="/checkout" class="showcoupon" >Click here to enter your code</a>
                            </div>
                        </div>
        
                        <div class="billing-details mt-5">
                            <h4 class="mb-4">Billing Details</h4>
                            <form class="checkout-form">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group mb-4">
                                        <label for="first_name">First Name</label>
                                        <input type="text" class="form-control" id="first_name" placeholder="" />
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group mb-4">
                                        <label for="last_name">Last Name</label>
                                        <input type="text" class="form-control" id="last_name" placeholder="" />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="company_name">Company Name(Optional)</label>
                                        <input type="text" class="form-control" id="company_name" placeholder="" />
                                    </div>
                                </div>
        
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="company_name">Country</label>
                                        <select class="form-control">
                                        <option value="">Select an Option</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                        </select>
                                    </div>
                                </div>
        
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="first_name">Street Address</label>
                                        <input type="text" class="form-control" id="street" placeholder="" />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="first_name">Apartment, suite, unit etc. (optional) (optional)</label>
                                        <input type="text" class="form-control" id="apartment" placeholder="Apartment" />
                                    </div>
                                </div>
        
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="first_name">Town / City </label>
                                        <input type="text" class="form-control" id="city" placeholder="Apartment" />
                                    </div>
                                </div>
        
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="company_name">District </label>
                                        <select class="form-control">
                                        <option value="">Select an Option</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="first_name">Postcode / ZIP (optional)</label>
                                        <input type="text" class="form-control" id="postcode" placeholder=""/>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="first_name">Phone </label>
                                        <input type="text" class="form-control" id="phone" placeholder="" />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="first_name">Email address </label>
                                        <input type="text" class="form-control" id="email" placeholder="" />
                                    </div>
                                </div>
        
                                <div class="col-lg-12">
                                <div class="form-check mb-4">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Create an account?</label>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-check mb-4">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                                        <label class="form-check-label" for="exampleCheck2">Ship to a different address?</label>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-4">
                                        <label for="first_name">Order notes (optional)</label>
                                        <textarea class="form-control" id="msg" cols="30" rows="5" placeholder="Notes about order e:g: want to say something"></textarea>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
        
                    
                    <div class="col-md-6 col-lg-4">
                        <div class="product-checkout-details mt-5 mt-lg-0">
                            <h4 class="mb-4 border-bottom pb-4">Order Summary</h4>
        
                            <div class="media product-card">
                                <p>Kirby Shirt</p>
                                <div class="media-body text-right">
                                    <p class="h5">1 x $249</p>
                                </div>
                            </div>
        
                            <ul class="summary-prices list-unstyled mb-4">
                                <li class="d-flex justify-content-between">
                                    <span >Subtotal:</span>
                                    <span class="h5">$190</span>
                                </li>
                                <li class="d-flex justify-content-between">
                                    <span >Shipping:</span>
                                    <span class="h5">Free</span>
                                </li>
                                <li class="d-flex justify-content-between">
                                    <span>Total</span>
                                    <span class="h5">$250</span>
                                </li>
                            </ul>
        
                            <form action="#">
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                    <label class="form-check-label" for="exampleRadios1">
                                    Direct bank transfer 
                                    </label>
        
                                    <div class="alert alert-secondary mt-3" role="alert">
                                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                    </div>
                                </div>
        
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                    <label class="form-check-label" for="exampleRadios2">
                                    Check payments 
                                    </label>
                                </div>
        
                                <div class="form-check mb-3">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck3" />
                                    <label class="form-check-label" for="exampleCheck3">I have read and agree to the website terms and conditions *</label>
                                    </div>
                            </form>
        
                            <div class="info mt-4 border-top pt-4 mb-5">
                                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy</a>.
                            </div>
                            <a href="/checkout" class="btn btn-main btn-small">Place Order</a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
        
       
            <div class="modal fade" id="coupon-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                <div class="modal-content py-5">
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                            <input class="form-control" type="text" placeholder="Enter Coupon Code" />
                            </div>
                            <button type="button" class="btn btn-main btn-small" data-dismiss="modal">Apply Coupon</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout;