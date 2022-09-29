import { Routes, Route } from "react-router-dom";
import AdminHome from "./AdminPages/home";
import AdminLogin from "./AdminPages/login";
import Home from "./Pages/home";
import Activate from "./Pages/home/activate";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>

        {/* admin's */}
        <Route path="/admin-home" element={<AdminHome />} exact />
        <Route path="/admin-login" element={<AdminLogin />} exact />
      </Routes>
    </div>
  );
}

export default App;
