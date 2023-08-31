import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import plus from "../assets/plus.png";
import Createnote from "../components/Createnote";
import Deletenote from "../components/Deletenote";
const Notes = () => {
  const [notesList, setNotesList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState();
  const [prevNote, setPrevNote] = useState();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("mytoken")).token;
    axios
      .get("https://notesbe.onrender.com/notes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setNotesList(res.data))
      .catch((err) => console.log(err));
  }, [showPopup, showDeletePopup]);
  return (
    <div>
      <Navbar />
      {showDeletePopup && (
        <Deletenote
          showDeletePopup={showDeletePopup}
          setShowDeletePopup={setShowDeletePopup}
        />
      )}
      {showPopup && (
        <Createnote
          setPrevNote={setPrevNote}
          prevNote={prevNote}
          setShowPopup={setShowPopup}
        />
      )}
      <div className="flex flex-col m-5">
        <div className="flex justify-end">
          <div
            onClick={() => setShowPopup(true)}
            className="bg-indigo-400 flex items-center p-3 rounded-md shadow-md mb-3 cursor-pointer"
          >
            <img className="h-5 w-5 mr-3" src={plus} alt="" />{" "}
            <div className="text-white font-semibold">Create Note</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {notesList.map((noteData) => (
            <Note
              setShowDeletePopup={setShowDeletePopup}
              showDeletePopup={showDeletePopup}
              setPrevNote={setPrevNote}
              setShowPopup={setShowPopup}
              data={noteData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
