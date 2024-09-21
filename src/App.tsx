import React from "react";
import "./App.css";
import SignIn from "./templates/auth/Login";
import SignInSide from "./sign-in-side/SignInSide";

function App() {
  return (
    <div className="App">
      <SignIn />
      {/* <SignInSide /> */}
    </div>
  );
}

export default App;
