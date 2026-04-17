# Web-programming-Lecture-Homework

Course homework repo — pair work, site in English, public GitHub so the teacher can check commits and history.

We’re Ibrahim and Chika; links below. Commits should show who did what (different machines / `git config` per person).

**Git email (so GitHub counts both contributors):** use each account’s **no-reply** address from **GitHub → Settings → Emails** (or these if they match yours):

- Ibrahim: `IbrahimTheMaster@users.noreply.github.com`
- Chika: `king2245@users.noreply.github.com`

Set with `git config user.email "…"` in this repo before committing.

**Ibrahim Aliyu** — https://github.com/IbrahimTheMaster  
**Chika Chinedu David** — https://github.com/king2245  

---

There’s a `docs/` folder with our notes (collaboration, SSH, who pushes how). It’s in `.gitignore` so it doesn’t land on GitHub; if you’re the other half of the pair and you only cloned this repo, ask for that folder on Teams.

Same for anything named like `*.private.*` — local only.

Hand-in for the course is the PDF (Teams), not this repo. The PDF still has to explain who built which part.

**Hosting (task 8):** see **`HOSTING.md`** — MySQL + `api/config.local.php` on the server only (gitignored).  

**PDF (task 11):** start from **`documentation/PROJECT-DOCUMENTATION.md`** — add screenshots, fill URLs and Neptun codes, export to PDF (≥15 pages), submit to Teams.

---

**Run locally**

- Static pages: `php -S localhost:8080` from this folder (or any static server).
- **React page:** run `npm install` once, then `npm run build:react` if you edit `src/react-crud.jsx`. The built `assets/react-crud.js` is in the repo so hosting works without Node.
- **Axios + React page:** `npm run build:axios` after changing `src/axios-crud.jsx` (built file: `assets/axios-crud.js`).
- **SPA mini-apps:** sources in `react/calculator/src` and `react/tictactoe/src`. Run `npm run build:calc`, `npm run build:ttt`, or `npm run build:spa` to refresh both `dist` folders before upload.
- **Fetch API page:** needs PHP. Copy `api/config.local.example.php` to `api/config.local.php` on the server with MySQL credentials from the host; otherwise it falls back to SQLite or a JSON file under `data/` for local dev.
