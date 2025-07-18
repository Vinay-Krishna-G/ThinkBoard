const Note = require("../models/Note.js");

async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getNoteById(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updateNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: `Note with ID ${id} updated successfully`,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
      message: `Note with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
};
