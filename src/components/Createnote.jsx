import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import close from "../assets/close.png";
const Createnote = ({ setShowPopup, prevNote, setPrevNote }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    if (prevNote) {
      setNote({ title: prevNote.title, content: prevNote.content });
    }
  }, []);
  const handleSave = () => {
    if (note.title.trim() !== "" && note.content.trim() !== "") {
      toast.loading("Saving", { id: "toast" });
      const token = JSON.parse(localStorage.getItem("mytoken")).token;
      let url = "";
      if (prevNote) {
        url = `https://notesbe.onrender.com/notes/update/${prevNote._id}`;
      } else {
        url = "https://notesbe.onrender.com/notes/create";
      }
      axios
        .post(url, note, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          toast.success(res.data.message, { id: "toast" });
          setPrevNote();
          setShowPopup(false);
        })
        .catch((err) => console.log(err));
    }
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
              setPrevNote();
              setShowPopup(false);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="title">
            Title
          </label>
          <input
            className="border rounded-sm px-2 py-1 outline-none border-gray-300 mt-1"
            type="text"
            id="title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="font-semibold" htmlFor="content">
            Content
          </label>
          <textarea
            className="border rounded-sm px-2 py-1 outline-none border-gray-300 mt-1"
            cols="60"
            type="text"
            id="content"
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSave}
            className="font-semibold text-white bg-indigo-400 px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createnote;
