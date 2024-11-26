import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "../templates/home/Top";
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
import Comment from "../templates/myPage/comment/Comment";
import HomeComment from "../templates/home/HomeComment";
import Fulfillment from "../templates/myPage/fulfillment/Fulfillment";
import HomeFulfillment from "../templates/home/HomeFulfillment";
import Bookmark from "../templates/myPage/bookmark/Bookmark";
import Profile from "../templates/myPage/profile/Profile";
import MyFulfillment from "../templates/myPage/fulfillment/MyFulfillment";
import DetailUser from "../templates/myPage/details/DetailUser";
import HomeDetailUser from "../templates/home/HomeDetailUser";
import PrivacyPolicy from "../templates/privacyPolicy/PrivacyPolicy";
import TermsOfService from "../templates/termsOfService/TermsOfService";
import AuthPrivacyPolicy from "../templates/privacyPolicy/AuthPrivacyPolicy";
import AuthTermsOfService from "../templates/termsOfService/AuthTermsOfService";
import Notification from "../templates/myPage/notification/Notification";

const Router = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Top />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<HomeDetailUser />} />
            <Route path="/fulfillment" element={<HomeFulfillment />} />
            <Route path="/comment/:id" element={<HomeComment />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="privacyPolicy" element={<AuthPrivacyPolicy />} />
            <Route path="termsOfService" element={<AuthTermsOfService />} />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myPage/detail/:id" element={<DetailUser />} />
            <Route path="/myPage/profile" element={<Profile />} />
            <Route path="/myPage/post" element={<PostRegister />} />
            <Route path="/myPage/postList" element={<PostList />} />
            <Route path="/myPage/postList/:id" element={<PostEdit />} />
            <Route path="/myPage/comment/:id" element={<Comment />} />
            <Route path="/myPage/myFulfillment/:id" element={<MyFulfillment />} />
            <Route path="/myPage/fulfillment" element={<Fulfillment />} />
            <Route path="/myPage/notification" element={<Notification />} />
            <Route path="/myPage/bookmarkList" element={<Bookmark />} />
            <Route path="/myPage/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/myPage/termsOfService" element={<TermsOfService />} />
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
