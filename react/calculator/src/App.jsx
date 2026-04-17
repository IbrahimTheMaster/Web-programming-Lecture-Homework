import { useState } from "react";

function compute(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? NaN : a / b;
  return b;
}

function formatResult(n) {
  if (!Number.isFinite(n)) return "Error";
  const s = String(n);
  if (s.length > 12) return Number(n.toPrecision(10)).toString();
  return s;
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState(null);
  const [pendingOp, setPendingOp] = useState(null);
  const [overwrite, setOverwrite] = useState(false);

  function pressDigit(d) {
    if (display === "Error") {
      setDisplay(d === "." ? "0." : d);
      setStored(null);
      setPendingOp(null);
      setOverwrite(false);
      return;
    }
    if (overwrite) {
      setDisplay(d === "." ? "0." : d);
      setOverwrite(false);
      return;
    }
    if (d === ".") {
      setDisplay((x) => (x.includes(".") ? x : x + "."));
      return;
    }
    setDisplay((x) => (x === "0" ? d : x + d));
  }

  function pressOp(next) {
    const v = parseFloat(display);
    if (Number.isNaN(v) || display === "Error") return;

    if (stored != null && pendingOp != null && !overwrite) {
      const r = compute(stored, v, pendingOp);
      const shown = formatResult(r);
      setDisplay(shown);
      setStored(Number.isFinite(r) ? r : null);
      if (!Number.isFinite(r)) {
        setPendingOp(null);
        setOverwrite(true);
        return;
      }
    } else if (stored == null) {
      setStored(v);
    }

    setPendingOp(next);
    setOverwrite(true);
  }

  function pressEq() {
    if (stored == null || pendingOp == null || display === "Error") return;
    const v = parseFloat(display);
    if (Number.isNaN(v)) return;
    const r = compute(stored, v, pendingOp);
    setDisplay(formatResult(r));
    setStored(null);
    setPendingOp(null);
    setOverwrite(true);
  }

  function pressClear() {
    setDisplay("0");
    setStored(null);
    setPendingOp(null);
    setOverwrite(false);
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
