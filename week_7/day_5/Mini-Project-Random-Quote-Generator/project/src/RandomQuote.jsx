import { useState } from "react";
import { quotes } from "./quotes";

export default function RandomQuote() {

  const getRandomQuote = () => {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const getRandomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 60%, 50%)`;
  };

  const [quote, setQuote] = useState(getRandomQuote());
  const [color, setColor] = useState(getRandomColor());

  const generateNewQuote = () => {
    let newQuote = getRandomQuote();

    // avoid repeating the same quote twice
    while (newQuote.text === quote.text) {
      newQuote = getRandomQuote();
    }

    setQuote(newQuote);
    setColor(getRandomColor());
  };

  return (
    <div
      style={{
        backgroundColor: color,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "0.4s"
      }}
    >
      <div
        style={{
          width: "450px",
          padding: "30px",
          borderRadius: "10px",
          background: "white",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ color }}>{quote.text}</h2>
        <p style={{ fontStyle: "italic" }}>— {quote.author}</p>

        <button
          onClick={generateNewQuote}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            backgroundColor: color,
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}
