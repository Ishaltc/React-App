import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
export default function SendEmail({email, userInfo,error,setError,setLoading,setVisible }) {
  const sentEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      setError("")
      setVisible(2)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message)
    }
  };

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">

        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to resent your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="email" checked readOnly />
            <div className="label_col">
              <span>Sent code via email</span>
              <span>{userInfo.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfo?.picture} alt="" />
          <span>{userInfo.email}</span>
          <span>Together user</span>
        </div>
      </div>
      {error && <div className="error_text" style={{padding:"10px"}}>{error}</div>}
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You?
        </Link>
        <button
          onClick={() => {
            sentEmail();
          }}
          className="blue_btn"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
