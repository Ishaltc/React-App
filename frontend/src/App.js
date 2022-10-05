import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./AdminPages/home";
import AdminLogin from "./AdminPages/login";
import CreatePostPopup from "./components/createPostPopup";
import Home from "./Pages/home";
import Activate from "./Pages/home/activate";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import Reset from "./Pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function reducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "POSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
//console.log(reducer);
function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    //after passing function setting default value
    loading: false,
    posts: [],
    error: "",
  });

useEffect(()=>{
  getAllPosts()
},[])

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
       
      });
    }
  };
//console.log(posts);
  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home setVisible={setVisible} posts={posts} />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} exact />
        {/* admin's */}
        {/* <Route path="/admin-home" element={<AdminHome />} exact />
        <Route path="/admin-login" element={<AdminLogin />} exact /> */}
      </Routes>
    </div>
  );
}

export default App;
