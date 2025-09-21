import { useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const autumnColors = [
  "#ffb347", "#ffd384", "#d8a47f", "#f4b393", "#b4b381", "#c6b7a5", "#e17c6b", "#f3d250"
  ];
  const [showConfirm, setShowConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  function addNote() {
    if (input.trim() === "") return;
    const color = autumnColors[Math.floor(Math.random() * autumnColors.length)]
    setNotes([...notes, {text: input, color, done: false}]);
    setInput("");
  }

  function deleteNote(idx) {
    setNotes(notes.filter((_, i) => i != idx));
  }

  return (
    <div className='app-container'>
      <header>
			<h1>Daily Cozy Notes 🍂</h1>
		  </header>
		<main>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Write a cozy note..."
      />
			<button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map((note, idx) => (
          <li key={idx} style={{background: note.color}}>
            <div>
              <span className={note.done ? "note-text done" : "note-text"}>
                {note.text}
                </span>
              <button
                className="done-btn"
                onClick={() => {
                setNotes(notes.map((note, i) =>
                i === idx ? { ...note, done: !note.done } : note
                  ));
                }}
                title={note.done ? "Unmark as done" : "Mark as done"}
              >
                ✓
              </button>
              <button 
                className="delete-btn" 
                onClick={() => {
                setNoteToDelete(idx);
                setShowConfirm(true);
                }}
                title='Delete note'
              >
                🍂
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Popup */}
        {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this note?</p>
            <div className="modal-buttons">
              <button
                className="modal-confirm"
                onClick={() => {
                  deleteNote(noteToDelete);
                  setShowConfirm(false);
                  setNoteToDelete(null);
                }}
              >
                Yes, delete
              </button>
              <button
                className="modal-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
		</main>
		<footer>
			<p>Made by <a href="https://github.com/Daniela-Padilha">ddo-carm</a></p>
		</footer>
    </div>
  );
}

export default App


