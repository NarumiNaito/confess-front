import React from "react";
import "./App.css";
import Login from "./templates/auth/Login";
import Register from "./templates/auth/Register";
import MyPage from "./templates/myPage/MyPage";
import Home from "./templates/home/Home";

function App() {
  return (
    <div className="App">
      {/* <MyPage /> */}
      <Home />
      {/* <Login /> */}
      {/* <Register /> */}
    </div>
  );
}

export default App;
