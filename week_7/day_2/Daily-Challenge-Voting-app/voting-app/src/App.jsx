import { useState } from "react";

function App() {

  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);

  const addVote = (index) => {
    const updated = [...languages];
    updated[index].votes += 1;
    setLanguages(updated);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Vote Your Language!</h1>

      {languages.map((lang, index) => (
        <div 
          key={index}
          style={{
            backgroundColor: "#fde6c7",
            width: "400px",
            margin: "15px auto",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #ccc",
            fontSize: "20px"
          }}
        >
          <span>{lang.votes}</span>
          <span>{lang.name}</span>

          <span
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => addVote(index)}
          >
            Click Here
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
