import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../templates/home/Home";
import Login from "../templates/auth/Login";
import Register from "../templates/auth/Register";
import MyPage from "../templates/myPage/MyPage";
import Page404 from "../templates/Page404";
import Loading from "../components/loading/Loading";
import SkeletonLoading from "../components/loading/SkeletonLoading";
import PostRegister from "../templates/myPage/PostRegister";
import PostList from "../templates/myPage/PostList";
import PostEdit from "../templates/myPage/PostEdit";
import { AuthContextProvider } from "./AuthContextProvider";
import PublicLayout from "./PublicLayout";
import PrivateLayout from "./PrivateLayout";

const Router = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myPage/post" element={<PostRegister />} />
            <Route path="/myPage/postList" element={<PostList />} />
            <Route path="/myPage/postList/:id" element={<PostEdit />} />
          </Route>
          <Route path="*" element={<Page404 />} />

          <Route path="/loading" element={<Loading />} />
          <Route path="/skeletonLoading" element={<SkeletonLoading />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default Router;
