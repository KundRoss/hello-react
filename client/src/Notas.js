import Nota from './Nota';

const Notas = ({ notes, removeNote, updateNote }) => {

  // render JSX
  return (
    <div className="card-columns">
      {notes.map((note) => (
        <Nota
          id={note._id}
          key={note._id}
          initialTitle={note.title}
          initialText={note.text}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      ))}
    </div>
  );
};

export default Notas;
