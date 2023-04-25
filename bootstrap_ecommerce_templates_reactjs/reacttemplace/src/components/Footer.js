function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
              <div className="footer-widget">
                <h4 className="mb-4">E-Shop</h4>
                <p className="lead">
                  Iste dolores iure quis excepturi, deserunt praesentium.
                </p>

                <div className="">
                  <p className="mb-0">
                    <strong>Location : </strong>Vietnam
                  </p>
                  <p>
                    <strong>Support Email : </strong> support@email.com
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Useful Link</h4>
                <ul className="pl-0 list-unstyled mb-0">
                  <li>
                    <a href="#">News &amp; Tips</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                  <li>
                    <a href="#">Our Shop</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-sm-6 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Opening Hours</h4>
                <ul className="pl-0 list-unstyled mb-5">
                  <li className="d-lg-flex justify-content-between">
                    Monday-Friday <span>8.00-20.00</span>
                  </li>
                  <li className="d-lg-flex justify-content-between">
                    Saturday <span>10.00-20.00</span>
                  </li>
                  <li className="d-lg-flex justify-content-between">
                    Sunday <span>12-20.00</span>
                  </li>
                </ul>

                <h5>Call Now : +(000) 000-000</h5>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-btm py-4 ">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <p className="copyright mb-0 ">
                @ Copyright Reserved to therichpost &amp; made by{" "}
                <a href="https://therichpost.com/">therichpost</a>
              </p>
            </div>
            <div className="col-lg-6">
              <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                <li className="list-inline-item">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Cookie Policy</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Terms of Sale</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
