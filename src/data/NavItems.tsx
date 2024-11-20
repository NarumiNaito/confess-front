import ChurchIcon from "@mui/icons-material/Church";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export const footerItems = ["利用規約", "プライバシーポリシー", "お問合せ"];

export const navItems = [
  { name: "新規登録", path: "/register", icon: <PersonAddIcon /> },
  { name: "ログイン", path: "/login", icon: <LoginIcon /> },
  { name: "ゲストログイン", path: "/guest", icon: <PeopleAltIcon /> },
];

export const pages = [
  { name: "みんなの懺悔", path: "/home", icon: <ChurchIcon /> },
  { name: "成就した懺悔", path: "/fulfillment", icon: <CelebrationIcon /> },
];

export const myPages = [
  { name: "みんなの懺悔", path: "/myPage/", icon: <ChurchIcon /> },
  { name: "成就した懺悔", path: "/myPage/fulfillment/", icon: <CelebrationIcon /> },
];
