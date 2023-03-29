import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Accessory from "./components/pages/Accessory";
import Cloth from "./components/pages/Cloth";
import Electronics from "./components/pages/Electronics";
import HandBag from "./components/pages/HandBag";
import Shoes from "./components/pages/Shoes";
import Toy from "./components/pages/Toy";
import Watchs from "./components/pages/Watchs";
import Shop from "./components/Shop";
import SignUp from "./components/Signup";
import SingleProduct from "./components/SingleProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/toy" element={<Toy />} />
          <Route path="/watch" element={<Watchs />} />
          <Route path="/handbag" element={<HandBag />} />
          <Route path="/accessory" element={<Accessory />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/cloth" element={<Cloth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/single-product" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}
export default App;
