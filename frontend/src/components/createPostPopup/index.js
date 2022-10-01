import { useEffect, useRef, useState } from "react";
import "./style.css";
import Picker from "emoji-picker-react";

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState("");
  const [cursorPosition,setCursorPosition] = useState()
  const [showPrev, setShowPrev] = useState(false);
  const [picker, setPicker] = useState(false);
  const textRef= useRef(null);
 
  useEffect(() => {
   textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition])


 const handleEmoji= (e,{emoji})=>{
//accessing the textRef
 const ref=textRef.current
 //when click emoji it get focused in textarea
 ref.focus()
 const start= text.substring(0, ref.selectionStart)
 const end = text.substring(ref.selectionStart)
 const newText = start + emoji +end;
 setText(newText);
 setCursorPosition(start.length+emoji.length)
 }



console.log(cursorPosition);

  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        
          {/* <textarea
            maxLength="100"
            value={text}
            className="post_input"
            placeholder={`What's on your mind,${user?.first_name}`}
            onChange={(e) => setText(e.target.value)}
          /> */}
          {!showPrev && (
           <div className="flex_center">
            <textarea
              maxLength="100"
              value={text}
              ref={textRef}
              className="post_input"
              placeholder={`What's on your mind,${user?.first_name}`}
              onChange={(e) => setText(e.target.value)}
            />
             </div>
          )}
          <div className="post_emojis_wrap">
            {picker && (
              <div className="comment_emoji_picker remove">
                <Picker onEmojiClick={handleEmoji}/>
              </div>
            )}
            <img src="../../../icons/colorful.png" alt=""/>
            <i className="emoji_icon_large" 
            onClick={()=>{
                setPicker((prev)=>!prev)
            }}
            ></i>
          </div>
        </div>
      </div>
    
  );
}
