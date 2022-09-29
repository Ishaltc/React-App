// import { Form, Formik } from "formik";
// import { useState } from "react";
// import LoginInput from "../../components/input/logininput";
// import "./style.css";
// import * as Yup from "yup";

// export default function () {
//   const loginInfos = {
//     email: "",
//     password: "",
//   };

//   const [login, setLogin] = useState(loginInfos);
//   const { email, password } = login;

  
//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     //changing email and password with value which user has been typed
//     setLogin({ ...login, [name]: value });

//     const loginValidation = Yup.object({
//         email: Yup.string()
//           .required("Email address is required"),
         
//         password: Yup.string()
//           .required("Password is required")
         
//       });
      
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
    





//   };

//   return (
//     <div className="myClass">
//       <img className="side_icon" src="./../icons/together_icon.jpg" alt="" />
//       <div className="login_wrap">
//         <div className="login_1">
//           <span>
//             <span className="together_text">Together </span>helping people to
//             connect
//           </span>
//         </div>
//         <div className="login_2">
//           <h2 className="together_text">Admin</h2>
//           <div className="login_2_wrap">
//             <Formik
//             enableReinitialize
//             initialValues={{ email, password }}
//             validationSchema={loginValidation}
//             onSubmit={() => {
//                 loginSubmit();
//               }}
//             >
//               <Form>
//                 <LoginInput
//                   type="text"
//                   name="email"
//                   placeholder="Email address"
//                   onChange={handleLoginChange}
//                 />
//                 <LoginInput
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   onChange={handleLoginChange}
//                   bottom
//                 />
//                 <button type="submit" className="blue_btn">
//                   Log In
//                 </button>
//               </Form>
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
