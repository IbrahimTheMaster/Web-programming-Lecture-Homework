import { useState } from "react";

function calc(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? NaN : a / b;
  return b;
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState(null);
  const [op, setOp] = useState(null);

  function pressDigit(d) {
    setDisplay((x) => {
      if (x === "0" && d !== ".") return d;
      if (d === "." && x.includes(".")) return x;
      return x + d;
    });
  }

  function pressOp(next) {
    const v = parseFloat(display);
    if (Number.isNaN(v)) return;
    if (acc != null && op) {
      const r = calc(acc, v, op);
      setAcc(r);
      setDisplay(String(r));
    } else {
      setAcc(v);
    }
    setOp(next);
    setDisplay("0");
  }

  function pressEq() {
    if (acc == null || op == null) return;
    const v = parseFloat(display);
    if (Number.isNaN(v)) return;
    const r = calc(acc, v, op);
    setDisplay(Number.isFinite(r) ? String(r) : "Error");
    setAcc(null);
    setOp(null);
  }

  function pressClear() {
    setDisplay("0");
    setAcc(null);
    setOp(null);
  }

  const keys = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="spa-mini">
      <p className="spa-mini__title">Calculator</p>
      <div className="calc-display">{display}</div>
      <div className="calc-keys">
        {keys.flatMap((row, ri) =>
          row.map((k) => (
            <button
              key={ri + "-" + k}
              type="button"
              className="calc-key"
              onClick={() => {
                if ("0123456789".includes(k)) pressDigit(k);
                else if (k === ".") pressDigit(".");
                else if (k === "=") pressEq();
                else pressOp(k);
              }}
            >
              {k}
            </button>
          ))
        )}
      </div>
      <button type="button" className="calc-clear" onClick={pressClear}>
        Clear
      </button>
    </div>
  );
}
