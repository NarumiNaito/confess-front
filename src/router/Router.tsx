import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../templates/home/Home";
import Login from "../templates/auth/Login";
import Register from "../templates/auth/Register";
import MyPage from "../templates/myPage/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
