export default function PostError({ error, setError }) {
  return (
    <div className="post_error">
      <div className="postError_error">{error}</div>
      <button className="blue_btn" onClick={() => setError("")}>
        Try again
      </button>
    </div>
  );
}
