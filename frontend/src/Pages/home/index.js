import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SentVerification from "../../components/home/sentVerification";
import Stories from "../../components/home/stories";
import Post from "../../components/post";
import useClickOutside from "../../helpers/ClickOutside";
import "./style.css";

export default function Home({ setVisible, posts }) {
  const { user } = useSelector((user) => ({ ...user }));
  // managing home page height according to the post
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  });
  // managing home page height according to the post
  return (
    <div className="home" style={{ height: `${height}px` }}>
      <Header />
      <LeftHome user={user} />

      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SentVerification user={user} />}

        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post}  />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
