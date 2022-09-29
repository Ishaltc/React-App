import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SentVerification from "../../components/home/sentVerification";
import Stories from "../../components/home/stories";
import useClickOutside from "../../helpers/ClickOutside";

import "./style.css"
export default function Home() {
const {user}= useSelector((user)=>({...user}))
  return (
    <div className="home">
    
      <Header />
      <LeftHome user={user}/>
    
      <div className="home_middle">
    
        <Stories/>
        {user.verified ?"":(
 <SentVerification user={user}/>
        )}
       
       
        <CreatePost user={user}/>
      </div>
      <RightHome user={user}/>
    </div>
  );
}
