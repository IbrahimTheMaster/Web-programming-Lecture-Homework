import axios from "axios";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const api = "api/items.php";

function App() {
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  function load() {
    setErr("");
    axios
      .get(api)
      .then((res) => {
        setRows(Array.isArray(res.data) ? res.data : []);
      })
      .catch((e) => {
        setErr(
          e.response?.data?.error ||
            e.message ||
            "API error — use php -S localhost:8080"
        );
        setRows([]);
      });
  }

  useEffect(() => {
    load();
  }, []);

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
    const body = { title: t, detail: d };
    const p =
      editingId != null
        ? axios.put(api + "?id=" + encodeURIComponent(editingId), body)
        : axios.post(api, body);
    p.then(() => {
      resetForm();
      load();
    })
      .catch((e) => {
        setErr(e.response?.data?.error || e.message || "save failed");
      })
      .finally(() => setBusy(false));
  }

  function onEdit(row) {
    setEditingId(Number(row.id));
    setTitle(String(row.title));
    setDetail(String(row.detail));
  }

  function onDelete(id) {
    const nid = Number(id);
    if (!window.confirm("Delete row " + nid + "?")) return;
    axios
      .delete(api + "?id=" + encodeURIComponent(nid))
      .then(() => {
        if (Number(editingId) === nid) resetForm();
        load();
      })
      .catch((e) => {
        setErr(e.response?.data?.error || e.message || "delete failed");
      });
  }

  return (
    <>
      <p>
        Same PHP API as the Fetch page (<code>api/items.php</code>), but the
        client uses <strong>Axios</strong> instead of <code>fetch</code>.
      </p>
      {err ? <p className="err">{err}</p> : null}

      <section className="crud-panel" aria-labelledby="ax-form-title">
        <h2 id="ax-form-title">Add or edit</h2>
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

      <section aria-labelledby="ax-list-title">
        <h2 id="ax-list-title">Rows (server)</h2>
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

const rootEl = document.getElementById("axios-root");
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
