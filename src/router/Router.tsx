import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../templates/home/Home";
import Login from "../templates/auth/Login";
import Register from "../templates/auth/Register";
import MyPage from "../templates/myPage/MyPage";
import Page404 from "../templates/Page404";
import Loading from "../components/loaging/Loading";
import SkeletonLoading from "../components/loaging/SkeletonLoading";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />

        <Route path="/loading" element={<Loading />} />
        <Route path="/skeletonLoading" element={<SkeletonLoading />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
