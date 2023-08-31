import React from "react";
import deleteicon from "../assets/delete.png";
import edit from "../assets/edit.png";
const Note = ({ data, setPrevNote, setShowPopup, setShowDeletePopup }) => {
  const handleEdit = () => {
    setPrevNote({ ...data });
    setShowPopup(true);
  };
  const handleDelete = () => {
    setShowDeletePopup(data._id);
  };
  return (
    <div className="flex flex-col bg-gray-50 shadow-md rounded-lg p-4 border">
      <div className="text-lg font-semibold">{data.title}</div>
      <div className="text-sm">{data.content}</div>
      <div className="flex justify-end items-end h-full">
        <img
          onClick={handleDelete}
          className="h-5 w-5 mx-2 cursor-pointer"
          src={deleteicon}
          alt=""
        />
        <img
          onClick={handleEdit}
          className="h-4 w-4 cursor-pointer"
          src={edit}
          alt=""
        />
      </div>
    </div>
  );
};

export default Note;
