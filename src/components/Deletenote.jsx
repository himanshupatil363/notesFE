import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import close from "../assets/close.png";
const Deletenote = ({ setShowDeletePopup, showDeletePopup }) => {
  const token = JSON.parse(localStorage.getItem("mytoken")).token;
  const handleDelete = () => {
    toast.loading("Deleting", { id: "toast" });
    axios
      .delete(`https://notesbe.onrender.com/notes/delete/${showDeletePopup}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message, { id: "toast" });
        setShowDeletePopup();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm backdrop-brightness-75 ">
      <div className="bg-white p-7 px-10 rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-end">
          <img
            className="h-4 w-4 cursor-pointer"
            src={close}
            alt=""
            onClick={() => {
              setShowDeletePopup();
            }}
          />
        </div>

        <div className="font-semibold mt-3">
          Are you sure do you want to Delete ?
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={handleDelete}
            className="font-semibold text-white bg-red-400 px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deletenote;
