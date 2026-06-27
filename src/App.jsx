import { useState } from "react";
import Layout from "./Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home.jsx";
import Login from "./Component/Login.jsx";
import Signup from "./Component/Signup.jsx";
import Accountsettings from "./UserProfile/Accountsettings.jsx";
import SetNotification from "./Component/SetNotification.jsx";
import AdminSelect_AllUsers from "./Component/Admin/AdminSelect_AllUsers.jsx";
import AddReminders from "./Component/AddReminders.jsx";
import UpdateNotification_Form from "./Component/UpdateNotification_Form.jsx";
import AdminReviewAllNotification from "./Component/Admin/AdminReviewAllNotification.jsx";
import AdminAdd from "./Component/Admin/AdminAdd.jsx";
import Fetchalladmindatamanage from "./Component/Admin/Fetchalladmindatamanage.jsx";
import Services from "./Component/Services.jsx";
import About from "./Component/About.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/home" index element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/Accountsettings"
              element={<Accountsettings />}
            ></Route>
            <Route
              path="/SetNotification"
              element={<SetNotification />}
            ></Route>
            <Route
              path="/AdminSelect_AllUsers"
              element={<AdminSelect_AllUsers />}
            ></Route>{" "}
            <Route path="/AddReminders" element={<AddReminders />}></Route>
            <Route
              path="/UpdateNotification_Form"
              element={<UpdateNotification_Form />}
            ></Route>
            <Route
              path="/AdminReviewAllNotification"
              element={<AdminReviewAllNotification />}
            ></Route>
            <Route path="/AdminAdd" element={<AdminAdd />}></Route>
            <Route
              path="/Fetchalladmindatamanage"
              element={<Fetchalladmindatamanage />}
            ></Route>
            <Route path="/Services" element={<Services />}></Route>
            <Route path="/About" element={<About />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
