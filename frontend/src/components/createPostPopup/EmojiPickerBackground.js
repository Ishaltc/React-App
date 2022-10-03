import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export default function EmojiPickerBackground({ text, user, setText, type2 }) {
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

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

  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          maxLength="100"
          value={text}
          ref={textRef}
          className={`post_input ${type2 ? "input2" : ""} `}
          placeholder={`What's on your mind,${user?.first_name}`}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className={!type2 ? "post_emojis_wrap" : ""}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "move_picker2" : "remove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src="../../../icons/colorful.png" alt="" />}
        <i
          className={`emoji_icon_large ${type2 ? "move_left" : ""}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}
