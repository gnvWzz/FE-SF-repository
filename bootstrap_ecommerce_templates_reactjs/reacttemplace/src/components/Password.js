import React, { useEffect, useState } from "react";
import { Formik, Form,Field } from "formik";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { ACCOUNT_URL } from "./URLS/url";

export default function Password(){

    const url = ACCOUNT_URL;
    const usernameLogin = localStorage.getItem("username");

    const REGEX = {
        //password có ít nhất 8 kí tự, có chữ cái in hoa, chữ cái thường, kí tự đặt biệt
        passwordRegex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      };

    const [form, setForm] = useState({
        password:"",
        checkValid:"",
        confirmPassword:""
      });
    
      const navigate = useNavigate();
    
      const [msgError, setmsgError] = useState({
        checkValid:"",
        password:"",
        confirmPassword:""
      });
    
      const handleChange =(e)=> {
        setForm({
          ...form,
          [e.target.name]:e.target.value 
        });
      }

      const handleSubmit =  ()=> { 
   
        const isFilled =
        form.password &&
        form.confirmPassword &&
        form.checkValid;
      
      const isError =
        isFilled &&
        (msgError.checkValid ||
          msgError.password ||
          msgError.confirmPassword);
    
          if(isFilled && !isError){
            const data = form.password;
            axios
            .post(`${url}/password/${data}/${usernameLogin}`)
            .then((res) =>{

            })
            .catch((err)=>{
              throw err
            })
            alert("Đổi mật khẩu thành công! " )
            navigate(`/profile`);
          }else {
            alert("Vui lòng điền đầy đủ thông tin!")
          }     
    }

    const handleValidate = async() =>{
        const errors = {
            checkValid:"",
            password:"",
            confirmPassword:""
        };

        if(!form.checkValid){
            errors.checkValid = "Bắt buộc"
        }else if(form.checkValid){
            const data = form.checkValid;
            await   axios
            .get(`${url}/password/${data}/${usernameLogin}`)
            .then((res) => {
              if(res.data === "Exist"){
                errors.checkValid = "";  
              }else{
                errors.checkValid = "Mật khẩu không đúng!";
              }
            })
            .catch((err) => {
              throw err;
            });
        }
      
       if (!form.password) {
            errors.password = "Bắt buộc";
          } else if (!REGEX.passwordRegex.test(form.password)) {  
            errors.password = "Mật khẩu có ít nhất 8 kí tự,1 chữ cái In hoa, số và kí tự đặt biệt ";
          }
    
        if (!form.confirmPassword) {
            errors.confirmPassword = "Bắt buộc";
          } else if (form.confirmPassword !== form.password){
            errors.confirmPassword = "Mật khẩu chưa trùng khớp";
          }
          setmsgError(errors);
          return errors;
      }


    return(

        <div className="signUp-container">
      <div class="account section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="login-form border p-5">
                <Formik 
                initialValues={form}
                validate={handleValidate}
                onSubmit={
                  handleSubmit
                }
                >
                    {({errors, touched}) =>(
                         <form  onSubmit={handleSubmit}>
                      
                         <div
                           class="form-group mb-4"
                           className={`custom-input ${
                               errors.checkValid ? "custom-input-error":""
                           }`}
                         >
                           <label for="#"> Password</label>
                           <Field
                             type="password"
                             class="form-control"
                             placeholder="Enter Password"
                             name="checkValid"
                             value={form.checkValid  || ""}
                             onChange={handleChange}
                           />  
                             {errors.checkValid && touched.checkValid
                           ?<p className="error">{errors.checkValid}</p>    
                           :null
                           }           
                         </div>
                         <div
                           class="form-group mb-4"
                           className={`custom-input ${
                               errors.password ? "custom-input-error":""
                           }`}
                         >
                           <label for="#"> New Password</label>
                           <Field
                             type="password"
                             class="form-control"
                             placeholder="Enter Password"
                             name="password"
                             value={form.password  || ""}
                             onChange={handleChange}
                           />  
                             {errors.password && touched.password
                           ?<p className="error">{errors.password}</p>    
                           :null
                           }           
                         </div>
                         <div
                           class="form-group"
                           className={`custom-input ${
                               errors.confirmPassword ? "custom-input-error":""
                           }`}
                         >
                           <label for="#">Confirm New Password</label>
                           <Field
                             type="password"
                             class="form-control"
                             placeholder="Confirm Password"
                             name="confirmPassword"
                             value={
                               form.confirmPassword  ||
                               ""
                             }
                             onChange={handleChange}
                           />
                            {errors.confirmPassword && touched.confirmPassword
                           ?<p className="error">{errors.confirmPassword}</p>    
                           :null
                           }                 
                         </div>
       
                         <button  class="btn btn-main mt-3 btn-block"  type="submit" >
                          Confirm
                         </button>
                       </form>
                    )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    
}