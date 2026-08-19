import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import MainPage from "./Page/MainPage";
import DashBoard from "./Page/DashBoard.jsx";
import "./App.css";


function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} >
            <Route index element={<DashBoard/>}/>
        </Route>
      </Routes>
  );
}

export default App;