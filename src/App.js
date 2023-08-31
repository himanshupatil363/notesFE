import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { Toaster } from "react-hot-toast";
import Inbox from "./pages/Inbox";
import Register from "./pages/Register";

const App = () => {
  useEffect(() => {}, []);
  return (
    <div className="h-full">
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <Notes />
            </PrivateRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/"
          element={
            <PrivateRoute>
            
            </PrivateRoute>
          }
        /> */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
const PrivateRoute = ({ children }) => {
  return localStorage.getItem("mytoken") ? children : <Navigate to="/login" />;
};
