import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ORDER_URL } from "./URLS/url";

export default function MyOrder(){

  const url = ORDER_URL;
  const loginName = localStorage.getItem("username");
  
  const [listOrder, setListOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listOrder.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  let isCancelled = false;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isCancelled) {
       axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        url: `${url}/list/${loginName}`,
        method: "GET",
      })
        .then((res) => {
          setListOrder(res.data);
          console.log(listOrder);
        })
        .catch((err) => {
          throw err;
        })
      }
    return () => {
      isCancelled = true;
    };
  }, [isCancelled]);

  const handelePageNumbers = () => {
    for (let i = 1; i <= listOrder.length / itemsPerPage + 1; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePrevious = () => {
    if (currentPage > Math.min(...pageNumbers)) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.max(...pageNumbers)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPage = (e) => {
    setCurrentPage(e.target.id);
  };

  const renderPageNumbers = handelePageNumbers().map((number) => {
    return (
      <li onClick={handleClickPage} className="page-item page-link" style={{height:"34px", color:"black"}} id={number}>
        {number}
      </li>
    );
  });

  const handleView = (value,totalPrice ,date)=>{
    console.log(value);
    navigate(`/orderdetails`, {state:{value ,totalPrice ,date}})
  }


  const renderOrder = currentItems.map((order,index) => (                         
    <tr>
      {/* <td>{index + 1}</td> */}
      <td>{order.dateOrder}</td>
      <td>{order.firstName} {order.lastName}</td>
      <td>{order.phone}</td>
      <td>{order.email}</td>
      <td>{order.street},{order.district},{order.city}</td>
      <td >{ order.orderCode}</td>
      <td style={{ textAlign: "center" }}>
        <button  className= "button-order" onClick={() =>handleView(order.orderCode , order.totalPrice , order.dateOrder)} >Views</button>
      </td>
    </tr>
  ));

  return (
   <div>
      <h1 style={{ textAlign: "center", color: "black" }}>Order History</h1>
      <div className="ml-5 mb-2"  style={{width:400,textAlign:"center"}}>
        <div class="input-group">
          <input
            type="text"
            placeholder="Search..."
            name="searchRoom"
            class="form-control search"
          />
          <div class="input-group-prepend" >
            <span class="input-group-text search_btn">
              <i i className="tf-ion-android-search"></i>
            </span>
          </div>
        </div>
      </div>
     


      <section class="intro">
        <div class="bg-image h-100">
          <div class="mask d-flex align-items-center h-100">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="table-responsive">
                        <table
                          class="table table-hover mb-0"
                          style={{ color: "black" }}
                        >
                          <thead>
                            <tr className="headerTable">
                              <th scope="col">Date</th>
                              <th scope="col">Receiver</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Email</th>
                              <th scope="col">Address</th>
                              <th scope="col">Order Code</th>
                              <th scope="col" style={{ textAlign: "center" }}>Details</th>
                            </tr>
                          </thead>
                          <tbody>{renderOrder}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-2 ml-5">
          <ul className="pagination">
            <li className="page-item">
              <button className= "button-order"  onClick={handlePrevious}>
                Trước
              </button>
            </li>
            {renderPageNumbers}
            <li className="page-item">
              <button className= "button-order"  onClick={handleNext}>
                Sau
              </button>
            </li>
          </ul>
        {/* </nav> */}
      </div>
    </div>
  );
}