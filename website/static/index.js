function deleteNote(noteId) {
  fetch("/delete-note", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}

// just testing on how to add another note, still doesn't work
function addnote(noteId) {
  fetch("/home", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId}),
  }).then((_res) => {
    window.location.href = "/";
  });
}