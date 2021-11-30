import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Notas from './Notas';
import Form from './Form';
import axios from 'axios';

const App = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/api/notes')
      .then(res => {
        console.log(res.data.notes);
        setNotes(res.data.notes);
      });
  }, []);

  // funciones del CRUD
  // crear nota
  const addNote = note => {
    axios.post('/api/notes', note)
      .then(res => {
        const newNotes = [res.data, ...notes];
        setNotes(newNotes);
      });
  };

  // update note
  const updateNote = (id, title, text) => {
    const updatedNote = {
      title: title,
      text: text
    };
    axios.put('/api/notes/' + id, updatedNote)
      .then(res => {
        const newNotes = notes.map(note =>
          note.id === id ? updatedNote : note
        );
        setNotes(newNotes);
      });
  };

  // delete note
  const removeNote = (id) => {
    axios.delete('/api/notes/' + id)
      .then(res => {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    });
  };

  return (
    <div>
      <Header title="Mi app de React" />
      <div className="container">
        <Form addNote={addNote} />
      </div>
      <Notas
          notes={notes}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      <Footer />
    </div>
  );
};

export default App;
