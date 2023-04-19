import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyOrder(){
  
    const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listUser.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  let isCancelled = false;
  const [userNameDelete, setUserNameDelete] = useState();
  const navigate = useNavigate();
  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(() => {
    if (!isCancelled) {
      axios
        .get("http://localhost:8080/get-users")
        .then((res) => {
          setListUser(res.data);
          console.log(listUser);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [isCancelled]);

  const handelePageNumbers = () => {
    for (let i = 1; i <= listUser.length / itemsPerPage + 1; i++) {
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
      <li onClick={handleClickPage} className="page-item page-link" id={number}>
        {number}
      </li>
    );
  });

  const handleDelete = (e) => {
    let data = e.target.value;
    axios
      .delete(`http://localhost:8080/delete/${data}`)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    setUserNameDelete("");
    setIsModalOn(false);
    window.location.reload();
  };

  const handleUserName = (e) => {
    setIsModalOn(true);
    setUserNameDelete(e.target.value);
  };

  const handleCreate  = ()=>{
    navigate("/signup");
  }

  const renderUser = currentItems.map((user) => (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.password}</td>
      <td>{user.phone}</td>
      <td>{user.email}</td>
      <td>
        {/* <img src={user.image} class="rounded-circle user_img" alt="avatar" /> */}
      </td>
      <td>{user.online}</td>
      <td style={{ textAlign: "center" }}>
        <button className="btn btn-primary ">Edit</button>
        <button
          className="btn btn-info ml-2"
          type="button"
          data-toggle="modal"
          data-target="#exampleModal"
          value={user.username}
          onClick={handleUserName}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      {isModalOn ? (
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Do you want to delete this user?
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleDelete}
                  value={userNameDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
                              <th scope="col">ID</th>
                              <th scope="col">Username</th>
                              <th scope="col">Password</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Email</th>
                              <th scope="col">Image</th>
                              <th scope="col">Status</th>
                              <th scope="col" style={{ textAlign: "center" }}>
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>{renderUser}</tbody>
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
        <nav aria-label="Page navigation example ">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={handlePrevious}>
                Trước
              </a>
            </li>
            {renderPageNumbers}
            <li className="page-item">
              <a className="page-link" onClick={handleNext}>
                Sau
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}