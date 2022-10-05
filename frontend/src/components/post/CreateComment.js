import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";

export default function CreateComments() {
  const [commentImage, setCommentImage] = useState("");
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [showBgs, setShowBgs] = useState(false);
  const { user } = useSelector((user) => ({ ...user }));
  const textRef = useRef(null);
  const imgInput = useRef(null);
  const handleEmoji = (e, { emoji }) => {
    //accessing the textRef
    const ref = textRef.current;
    //when click emoji it get focused in textarea
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name} format isn't supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large.Max 5mb allowed`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event) => {
      setCommentImage(event.target.result);
    };
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}

          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,images/png,images/gif,images/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="post_error comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try Again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Drop a comment...."
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="comment_circle_icon hover3"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover3"
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover3">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover3">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div className="small_white_circle"
          onClick={()=> setCommentImage("")}>
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}
