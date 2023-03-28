
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
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
function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
          <Header></Header>
            <Routes>
              {/* <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/single-product" element={<SingleProduct />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} /> */}

              <Route path="/shop" element={<Shop/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
              <Route path="/single-product" element={<SingleProduct/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="/" element={<Home/>}/>
              
            </Routes>
          <Footer></Footer>
        </BrowserRouter>
     
    </div>
  );
}
export default App;