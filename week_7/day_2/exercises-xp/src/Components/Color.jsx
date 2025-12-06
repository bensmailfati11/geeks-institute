import { useState, useEffect } from "react";

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached!");
  }, [favoriteColor]);

  return (
    <div>
      <h1>My favorite color is {favoriteColor}</h1>

      <button onClick={() => setFavoriteColor("blue")}>
        Change Color
      </button>
    </div>
  );
}

export default Color;
