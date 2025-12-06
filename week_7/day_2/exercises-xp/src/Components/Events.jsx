import { useState } from "react";

function Events() {
  const clickMe = () => {
    alert("I was clicked!");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert(`You pressed Enter: ${e.target.value}`);
    }
  };

  const [isToggleOn, setIsToggleOn] = useState(true);

  const toggleButton = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div>
      <button onClick={clickMe}>Click Me</button>

      <input type="text" onKeyDown={handleKeyDown} />

      <button onClick={toggleButton}>
        {isToggleOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}

export default Events;
