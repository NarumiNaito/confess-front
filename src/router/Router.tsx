import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../templates/home/Home";
import Login from "../templates/auth/Login";
import Register from "../templates/auth/Register";
import MyPage from "../templates/myPage/post/MyPage";
import Page404 from "../templates/Page404";
import Loading from "../components/loading/Loading";
import SkeletonLoading from "../components/loading/SkeletonLoading";
import PostRegister from "../templates/myPage/post/PostRegister";
import PostList from "../templates/myPage/post/PostList";
import PostEdit from "../templates/myPage/post/PostEdit";
import { AuthContextProvider } from "./AuthContextProvider";
import PublicLayout from "./PublicLayout";
import PrivateLayout from "./PrivateLayout";
import MyComment from "../templates/myPage/comment/MyComment";
import Comment from "../templates/myPage/comment/Comment";
import HomeComment from "../templates/home/HomeComment";
import Fulfillment from "../templates/myPage/fulfillment/Fulfillment";
import HomeFulfillment from "../templates/home/HomeFulfillment";
import Bookmark from "../templates/myPage/bookmark/Bookmark";

const Router = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/fulfillment" element={<HomeFulfillment />} />
            <Route path="/comment/:id" element={<HomeComment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myPage/post" element={<PostRegister />} />
            <Route path="/myPage/postList" element={<PostList />} />
            <Route path="/myPage/postList/:id" element={<PostEdit />} />
            <Route path="/myPage/myComment/:id" element={<MyComment />} />
            <Route path="/myPage/comment/:id" element={<Comment />} />
            <Route path="/myPage/fulfillment" element={<Fulfillment />} />
            <Route path="/myPage/bookmarkList" element={<Bookmark />} />
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
