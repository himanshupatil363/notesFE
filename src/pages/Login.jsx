import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    toast.loading("Logging In", { id: "toast" });
    e.preventDefault();
    axios
      .post("https://notesbe.onrender.com/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("mytoken", JSON.stringify(res.data));
          toast.success("Logged In Successfully", { id: "toast" });
          navigate("/notes");
        }
      })
      .catch((err) => toast.error(err.response.data.error, { id: "toast" }));
  };
  return (
    <div className="flex h-full w-full justify-center items-center bg-gradient-to-r from-indigo-300 to-purple-300">
      <form
        className=" bg-indigo-100 border px-10 py-6 shadow rounded"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col">
          <label className="text-lg font-semibold" htmlFor="username">
            Username
          </label>
          <input
            className="my-2 p-2 rounded w-64"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="username"
            id="username"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="my-2 p-2 rounded w-64"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-indigo-500 px-4 py-2 rounded text-white font-semibold text-lg"
            type="submit"
          >
            Login
          </button>
        </div>
        <NavLink
          to="/register"
          className="mt-4 text-sm flex justify-center text-center text-indigo-600 cursor-pointer"
        >
          Dont have an account? create one
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
