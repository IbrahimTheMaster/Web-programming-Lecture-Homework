import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("data/sample.json")
      .then((r) => {
        if (!r.ok) throw new Error("bad response");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!Array.isArray(data)) throw new Error("not an array");
        setRows(
          data.map((x) => ({
            id: x.id,
            title: String(x.title),
            detail: String(x.detail),
          }))
        );
      })
      .catch((e) => {
        if (!cancelled) setLoadError(String(e.message || e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function nextId() {
    if (!rows.length) return 1;
    return Math.max(...rows.map((r) => r.id)) + 1;
  }

  function resetForm() {
    setTitle("");
    setDetail("");
    setEditingId(null);
  }

  function onSubmit(e) {
    e.preventDefault();
    const t = title.trim();
    const d = detail.trim();
    if (!t || !d) return;
    setBusy(true);
    if (editingId != null) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === editingId ? { ...r, title: t, detail: d } : r
        )
      );
    } else {
      setRows((prev) => [...prev, { id: nextId(), title: t, detail: d }]);
    }
    resetForm();
    setBusy(false);
  }

  function onEdit(row) {
    setEditingId(row.id);
    setTitle(row.title);
    setDetail(row.detail);
  }

  function onDelete(id) {
    if (!window.confirm("Delete row " + id + "?")) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <>
      <p>
        React CRUD (method A: npm + esbuild bundle — run{" "}
        <code>npm install</code> then <code>npm run build:react</code> after
        editing JSX). Data seed from <code>data/sample.json</code> like the
        plain JS page, then kept in React state.
      </p>
      {loadError ? (
        <p className="err">Could not load sample.json: {loadError}</p>
      ) : null}

      <section className="crud-panel" aria-labelledby="react-form-title">
        <h2 id="react-form-title">Add or edit</h2>
        <form onSubmit={onSubmit}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={120}
            />
          </label>
          <label>
            Detail
            <input
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
              maxLength={240}
            />
          </label>
          <button type="submit" disabled={busy}>
            Save
          </button>
          {editingId != null ? (
            <button type="button" onClick={resetForm}>
              Cancel edit
            </button>
          ) : null}
        </form>
      </section>

      <section aria-labelledby="react-list-title">
        <h2 id="react-list-title">Rows</h2>
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Detail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.detail}</td>
                <td>
                  <button type="button" onClick={() => onEdit(row)}>
                    Edit
                  </button>{" "}
                  <button type="button" onClick={() => onDelete(row.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

const el = document.getElementById("react-root");
if (el) {
  createRoot(el).render(<App />);
}
