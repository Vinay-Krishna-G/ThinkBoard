import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
// import Note from "../../../backend/src/models/Note";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");

        console.log("Response from server:", res.data);

        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error(" Failed ");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => {
              return <NoteCard key={note._id} note={note} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
