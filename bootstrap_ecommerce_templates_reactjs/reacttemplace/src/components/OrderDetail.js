
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ORDER_URL } from "./URLS/url";

export default function OrderDetails(){
  const name = localStorage.getItem("username");
  let {state} = useLocation();
  const[orderDetails,setOrderDetails] = useState([]);
  let isStop = false;
  const url = ORDER_URL;

  const formatCurrency = (currency) => {
    let intCurrency = currency;
    const format = intCurrency
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return format;
  };

  useEffect(()=>{
 
      if (!isStop) {
        axios({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          url: `${url}/orderDetails/${state.value}`,
          method: "GET",
        })
          .then((res) => {
            setOrderDetails(res.data);
          })
          .catch((err) => {
            throw err;
          });
      } 

    return () => {
      isStop = true;
    };

  },[])


    return(
        <section class="h-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-10 col-xl-8">
              <div class="card" style={{borderRadius: "10px"}}>
                <div class="card-header px-4 py-5">
                  <h5 class="text-muted mb-0">Thanks for your Order, <span style={{color: "#a8729a"}}>{name}</span>!</h5>
                </div>
                <div class="card-body p-4">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="lead fw-normal mb-0" style={{color: "#a8729a"}}>Receipt</p>
                  </div>
                  <div class="card shadow-0 border mb-4">

                    {orderDetails.map((orderDetails) =>(
                       <div class="card-body">
                       <div class="row">
                         <div class="col-md-2">
                           <img src={JSON.parse(orderDetails.size_color_img_quantity).img[0].url}
                             class="img-fluid" alt="Phone"/>
                         </div>
                         <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                           <p class="text-muted mb-0">{orderDetails.name}</p>
                         </div>
                         <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                           <p class="text-muted mb-0 small">{formatCurrency(orderDetails.price)}</p>
                         </div>
                        
                         <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                           <p class="text-muted mb-0 small">Qty:{orderDetails.quantity}</p>
                         </div>
                         <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                           <p class="text-muted mb-0 small">{formatCurrency(orderDetails.subTotal)}</p>
                         </div>
                       </div>
                       <hr class="mb-4" style={{backgroundColor:"#e0e0e0", opacity: "1"}}/>
                     </div>
                    ))}
                 
                  </div>
 
                  <div class="d-flex justify-content-between pt-2">
                    <p class="text-muted mb-0">Invoice Number : 788152</p>
                    <p class="text-muted mb-0"><span class="fw-bold me-4">Discount</span> $19.00</p>
                  </div>
      
                  <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0">Invoice Date : {state.date}</p>
                    <p class="text-muted mb-0"><span class="fw-bold me-4">GST 18%</span> 123</p>
                  </div>
      
                  <div class="d-flex justify-content-between mb-5">
                    <p class="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                    <p class="text-muted mb-0"><span class="fw-bold me-4">Delivery Charges</span> Free</p>
                  </div>
                </div>
                <div class="card-footer border-0 px-4 py-5"
                  style={{backgroundColor:"#a8729a", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}>
                  <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"> Total
                    paid: <span class="h2 mb-0 ms-2 ml-3">{formatCurrency(state.totalPrice)} VND</span></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}