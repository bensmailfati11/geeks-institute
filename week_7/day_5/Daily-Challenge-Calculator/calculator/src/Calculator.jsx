import { useState } from "react";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult("Please enter valid numbers");
      return;
    }

    let res;

    switch (operator) {
      case "+":
        res = a + b;
        break;
      case "-":
        res = a - b;
        break;
      case "*":
        res = a * b;
        break;
      case "/":
        res = b !== 0 ? a / b : "Cannot divide by zero";
        break;
      default:
        res = 0;
    }

    setResult(res);
  };

  return (
    <div style={styles.container}>
      <h2>React Calculator 🧮</h2>

      <div style={styles.inputs}>
        <input
          type="number"
          placeholder="First number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={styles.input}
        />

        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={styles.select}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>

        <input
          type="number"
          placeholder="Second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={calculate} style={styles.button}>
        Calculate
      </button>

      {result !== null && <h3 style={styles.result}>Result: {result}</h3>}
    </div>
  );
};

const styles = {
  container: {
    margin: "50px auto",
    padding: "60px",
    width: "550px",
    textAlign: "center",
    background: "#da22a3ff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  inputs: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "90px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  result: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default Calculator;
