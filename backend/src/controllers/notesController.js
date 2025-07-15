export function getAllNotes(req, res) {
  res.status(200).send("you just fetched all notes");
}

export function createNote(req, res) {
  res.status(201).json({
    message: "Note created successfully",
  });
}

export function updateNote(req, res) {
  res.status(200).json({
    message: `Note with ID ${req.params.id} updated successfully`,
  });
}
export function deleteNote(req, res) {
  res.status(200).json({
    message: `Note with ID ${req.params.id} deleted successfully`,
  });
}
