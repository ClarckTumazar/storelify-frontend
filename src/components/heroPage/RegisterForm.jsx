 // import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../service/userService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import './RegisterForm.css'
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required("Email is required.").email(),
    password: yup.string().required("Password is required.").min(8),
    confirmPassword: yup.string().required("Confirm Password is required.").min(8),
  })
  .required();

const RegisterForm = () => {
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
    if (user.password !== user.confirmPassword) {
      console.log(user)
      alert('passwords does not match!')
      return
    }

    console.log(user)

    let userData = {
      userEmail: user.email,
      userPassword: user.password,
    }

    UserService.saveUser(userData)
      .then((response) => {
        console.log(response);
        alert('registered successfully!')
        navigate("/home")
      })
      .catch((error) => {
        console.log(error)
        alert('registration failed :(')

      });
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header className="login-form-header"> Create new account </header>
      <div className="sub-header">Already have an account? 
      <a href="" > login now </a></div>
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
          {...register("password")}
        />
        <span className="error-message">{errors.password?.message}</span>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <span className="error-message">{errors.confirmPassword?.message}</span>

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
