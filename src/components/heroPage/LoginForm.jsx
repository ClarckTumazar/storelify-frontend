 // import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import UserService from "../../service/userService";
 import { useForm } from "react-hook-form";
 import { yupResolver } from "@hookform/resolvers/yup";
 import './Form.css'
 import * as yup from "yup";
 import YupPassword from "yup-password";
 YupPassword(yup)
 
 const schema = yup
   .object({
     email: yup
       .string()
       .required("Please enter your email.")
       .min(6, "Please use between 6 and 30 characters.")
       .max(30, "Please use between 6 and 30 characters.")
       .email("Email must be in this format: name@domain.com"),
 
     password: yup
       .string()
       .required("Please enter your password.")
       .min(8, "Password must be at least 8 characters."),
   })
   .required();
 
 const LoginForm = ({setToRegister, setUserEmail}) => {
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm({
     defaultValues: {
       email: "",
       password:"",
     },
     resolver: yupResolver(schema),
   });
 
   const navigate = useNavigate();
 
   const onSubmit = (user) => {
     console.log(user)
 
     let userData = {
       userEmail: user.email,
       userPassword: user.password,
     }  
     // checks if email exist in database
     UserService.checkUser(userData)
       .then((response) => {
          console.log(response);
          if(response.data['Exist'] === true) {
            console.log(response.data)

            // checks the password if match in database
            UserService.checkPassword(userData)
            .then((response) => {
              console.log(response.data)
              if (response.data['Match'] === true) {
                alert('Succesfully Login!');
                console.log(userData.userEmail)
                navigate(`/home/${userData.userEmail}`)

              } else {
                const subHeader = document.getElementById('sub-header')
                subHeader.classList.add('sub-header-failed-message')
                subHeader.innerText = "Oops 🙊 Looks like you mistype it's alright! try again or "
                
                const link = document.createElement('a')
                link.addEventListener('click', (e) => setToRegister(e))
                link.innerHTML = " create an account"
                link.className = "sub-header-link"

                subHeader.appendChild(link)
                return
              }
            })
            .catch((error) => {
              console.log(error)
            })
            console.log(response.data)

          }
          else {
            const subHeader = document.getElementById('sub-header')
            subHeader.classList.add('sub-header-failed-message')
            subHeader.innerText = "Oops 🙊 Looks like you mistype it's alright! try again or "
            
            const link = document.createElement('a')
            link.addEventListener('click', (e) => setToRegister(e))
            link.innerHTML = " create an account"
            link.className = "sub-header-link"

            subHeader.appendChild(link)
            return
          }
       })
       .catch((error) => {
         console.log(error) 
       });


   };
   

 
   return (
     <form onSubmit={handleSubmit(onSubmit)}>
       <header className="login-form-header"> Log in </header>
       <div className="sub-header" id="sub-header">Don't have an account? 
       <a href="#" onClick={(e) => setToRegister(e)} >  create one now  </a></div>

         <div className="input-group">
           <input
             type="email"
             name="email"
             placeholder="Email"
             {...register("email")}
           />
           <span className="error-message">{errors.email?.message}</span>
           <input
             type="password"
             name="password"
             className="input-password"
             placeholder="Password"
             {...register("password")}
           />
           <span className="error-message">{errors.password?.message}</span>
        </div>
 
         <button type="submit"> 
           Login
         </button>
         <span className="button-sub-text">By clicking Login you agree to the  company’s 
           <a href="" > Terms and Conditions </a> and have read the 
           <a href="" > Data Use Policy </a>.
            </span>
           
     </form>
   );
 };
 
 export default LoginForm;
 