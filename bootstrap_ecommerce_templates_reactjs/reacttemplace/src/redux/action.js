import axios from "axios";
import { useState } from "react";

// export const LOGIN = "LOGIN";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const FETCH_USER = "FETCH_USER";
// export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

// export const fakeLogin = payload => {
//     return async dispatch => {
//         const {username,password} = payload;
//         if(username != "" && password != ""){
//           dispatch(login(payload));
//         }
     
//   };
// }

//   export const login = (payload)=>{
//     return async dispatch => {
//      await axios
//       .post(`http://localhost:8080/api/account/login`, payload)
//       .then((res) => {
//         if(res.data !== ""){
//           // localStorage.setItem("token"+ res.data);
//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload
//               });
//         }else{
//           alert("Tài Khoản hoặc Mật Khẩu chưa đúng!")
//         }
//       })
//       .catch((err) => {
//         alert("Tài Khoản hoặc Mật Khẩu chưa đúng!")
//         throw err;
//       });
//     };
//     };
  
  
  