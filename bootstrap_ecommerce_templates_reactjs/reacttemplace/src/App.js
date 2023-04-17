import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Shop from "./components/Shop";
import SignUp from "./components/Signup";
import SingleProduct from "./components/SingleProduct";
import Product from "./components/pages/Product";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CART_URL } from "./components/URLS/url";
function App() {
  const [categories, setCategorise] = useState([]);
  const[provinces,setProvinces] = useState([]);
  
  const cart_url = CART_URL;
  let isStop = false;
  let isStop1 = false;
  // LAY CATEGORIES BANG CACH LAY CACHE BEN BACK END==========
  useEffect(() => {
    // localStorage.removeItem("token");
    if (!isStop) {
      axios
        .get("http://localhost:8080/api/categories/find-all")
        .then((res) => {
          setCategorise(res.data.categories);
          setProvinces(res.data.provinces);
        })
        .catch((err) => {
          throw err;
        });
    }
    return () => {
      isStop = true;
    };
  }, []);
  // ============================================================

  


  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <Header categories={categories}></Header>
        <Routes>
          <Route path="/shop/" element={<Shop categories={categories} />} />
          <Route
            path="/shop/:name"
            element={<Product categories={categories} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout  />} />
          <Route
            path="/single-product/:package_id"
            element={<SingleProduct />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp provinces = {provinces} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
      {/* </Provider> */}
    </div>
  );
}
export default App;
