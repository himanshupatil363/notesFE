import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("mytoken"));
  const email = user.email;
  const inbox = user.sharedNotes;
  const handleLogout = () => {
    localStorage.removeItem("mytoken");
    setShowLogout(false);
    navigate("/login");
  };
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="">
      <div className="flex items-center justify-between px-20 bg-gray-100 py-3">
        <div className="text-4xl text-indigo-400 font-bold">Notify</div>
        <div className="flex">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "underline underline-offset-8 decoration-2 decoration-indigo-400 px-2 mx-4"
                : "px-2 mx-4"
            }
            to="/notes"
          >
            Notes
          </NavLink>
          {/* <div className="flex mx-4">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "underline underline-offset-8 decoration-2 decoration-indigo-400 px-2 flex"
                  : "px-2 flex"
              }
              to="/inbox"
            >
              Inbox
            </NavLink>
            <div className="bg-indigo-300 text-center w-full px-2 h-full rounded-full">
              {inbox}
            </div>
          </div> */}
        </div>
        <div className="relative" ref={dropdownRef}>
          <Avatar
            onClick={() => {
              setShowLogout(!showLogout);
            }}
            className="cursor-pointer"
            name={email}
            size="50"
            round="100%"
            textSizeRatio={1.75}
          />
          {showLogout && (
            <div
              className="absolute bg-white rounded-lg p-3 left-[-35%] mt-2 shadow-lg px-5 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
