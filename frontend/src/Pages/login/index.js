import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";

export default function Login() {
  const [visible,setVisible]= useState(false)
  return (
    <>
      <img className="side_icon" src="./../icons/together_icon.jpg" alt="" />
      <div className="login">
        <div className="login_wrapper">
          <LoginForm setVisible={setVisible} />

        { visible &&  <RegisterForm  setVisible={setVisible}/>}
        </div>
      </div>
    </>
  );
}

{
  /* <img
              className="logo_together"
              src="../../icons/together text.png"
              alt=""
            /> */
}
