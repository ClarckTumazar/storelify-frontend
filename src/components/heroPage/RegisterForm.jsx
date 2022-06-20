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
      .min(8, "Password must be at least 8 characters.")
      .minUppercase(1, "Password must contain atleast 1 uppercase.")
      .minSymbols(1, "Password must contain at least 1 symbol.")
      .minNumbers(1, "Password must contain at least 1 Number."),
    confirmPassword: yup
      .string()
      .required("Please re-type your password to confirm.")
      .oneOf([yup.ref('password'), null], 'Password and Confirm password do not match.')

  })
  .required();

const RegisterForm = ({setToLogin}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password:"",
      confirmPassword:"",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (user) => {
    console.log(user)
    const subHeader = document.getElementById('sub-header-register')
    let userData = {
      userEmail: user.email,
      userPassword: user.password,
    }

    //check if email already exist in database
    UserService.checkUser(userData)
    .then((response) => {
      if(response.data['Exist'] === false) {
        UserService.saveUser(userData)
        .then((response) => {
          console.log(response);
          alert('Registered successfully!')
          const link = document.createElement('a')
          link.addEventListener('click', (e) => setToLogin(e))
          subHeader.appendChild(link)
          link.click()
          subHeader.removeChild(link)          
        })
        .catch((error) => {
          console.log(error)
          alert('registration failed :(')
          return
        });

      } else {
        subHeader.classList.add('sub-header-failed-message')
        subHeader.innerText = "Oops 🙊 Looks like you already have an account! want to login? click the banana"
        
        const link = document.createElement('a')
        link.addEventListener('click', (e) => setToLogin(e))
        link.innerHTML = " 🍌"
        link.className = "sub-header-link"

        subHeader.appendChild(link)
        return
      }
    })
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header className="login-form-header"> Create new account </header>
      <div className="sub-header" id="sub-header-register">Already have an account? 
      <a href="" onClick={(e) => setToLogin(e)} > login now </a></div>
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
            placeholder="Password"
            className="input-password"
            {...register("password")}
          />
          <span className="error-message">{errors.password?.message}</span>
          <input
            type="password"
            name="confirmPassword"
            className="input-password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <span className="error-message">{errors.confirmPassword?.message}</span>
        </div>

        <button type="submit"> 
          Create account
        </button>
        <span className="button-sub-text">By clicking Create account you agree to the  company’s 
          <a href="" > Terms and Conditions </a> and have read the 
          <a href="" > Data Use Policy </a>.
           </span>
          
    </form>
  );
};

export default RegisterForm;
