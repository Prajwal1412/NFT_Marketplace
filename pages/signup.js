import React from "react";

//INTERNAL IMPORT
import Style from "../styles/signup.module.css";
import LoginAndSignUp from "../LoginAndSignup/loginandsignup";

const signup = () => {
  return (
    <div className={Style.signup}>
      <div className={Style.signup_box}>
        <h1>Signup</h1>
        <LoginAndSignUp />
        <p className={Style.signup_box_para}>
          Existing user? <a href="#">Login into your account!</a>
        </p>
      </div>
    </div>
  );
};

export default signup;
