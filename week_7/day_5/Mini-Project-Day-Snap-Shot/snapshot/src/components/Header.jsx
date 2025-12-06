import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    navigate(`/search/${text}`);
    setText("");
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>SnapShot</h1>

      {/* Navigation */}
      <nav style={styles.nav}>
        <Link to="/search/mountain">Mountain</Link>
        <Link to="/search/beach">Beaches</Link>
        <Link to="/search/birds">Birds</Link>
        <Link to="/search/food">Food</Link>
      </nav>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} style={styles.searchForm}>
        <input
          type="text"
          placeholder="Search photos..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button}>Search</button>
      </form>
    </header>
  );
};

const styles = {
  header: {
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#111",
    color: "white",
    flexWrap: "wrap",
    gap: "20px",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  searchForm: {
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    width: "180px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "6px",
    background: "#ff4f4f",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Header;
