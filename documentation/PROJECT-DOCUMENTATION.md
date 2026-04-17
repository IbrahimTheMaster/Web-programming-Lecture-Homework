# Web programming — lecture homework (documentation draft)

**Course:** Web programming seminar  
**Project:** Web-programming-Lecture-Homework  
**Language of the website:** English  

**Group members**

| Name | Neptun code | GitHub |
|------|---------------|--------|
| Ibrahim Aliyu | *(fill in)* | IbrahimTheMaster |
| Chika Chinedu David | *(fill in)* | king2245 |

**Repository (public):**  
https://github.com/IbrahimTheMaster/Web-programming-Lecture-Homework  

**Live site URL:** *(fill in after deployment — e.g. `https://yoursite.nethely.hu/`)*  

**FTP / hosting check (for teacher — do not put in GitHub repo):**

| Field | Value |
|-------|--------|
| Host / FTP URL | *(fill in)* |
| Username | *(fill in)* |
| Password | *(fill in)* |  

---

## Table of contents

1. Submission and access  
2. GitHub and version control  
3. Division of work (who did what)  
4. Task 1 — Home page (`index.html`)  
5. Task 2 — JavaScript CRUD (`javascript.html`)  
6. Task 3 — React CRUD (`react.html`)  
7. Task 4 — SPA (`spa.html`) and `react/` folders  
8. Task 5 — Fetch API (`fetchapi.html`)  
9. Task 6 — Axios (`axios.html`)  
10. Task 7 — OOJS (`oojs.html`)  
11. Task 8 — Internet hosting  
12. Tasks 9–10 — GitHub process and authorship  
13. Task 11 — This documentation  
14. File map (quick reference)  
15. Appendix — local run commands  

---

## 1. Submission and access

This document describes how the homework requirements are implemented. Screenshots below should be replaced with your own captures from the **live** site and from **GitHub** where indicated.

Each group member submits **one PDF** to Teams named **`Name-NeptunCode.pdf`**. Only the PDF is submitted; other files stay on GitHub and hosting.

---

## 2. GitHub and version control

The source is in a **public** repository so the teacher can verify history and contributors.

**URL:** https://github.com/IbrahimTheMaster/Web-programming-Lecture-Homework  

**Requirements met:**

- Repository is **public**.  
- **Multiple commits** with incremental work (not a single upload).  
- **Commit authors** use GitHub-linked emails so **both** contributors appear (see `README.md` for no-reply addresses).  

**Screenshot placeholder:** GitHub repository main page, **Contributors** showing two users, **Commits** with mixed authors.  
*(Insert: `screenshots/github-repo.png`, `screenshots/github-commits.png`)*  

---

## 3. Division of work (who did what)

| Area | Primary owner | Notes |
|------|---------------|--------|
| Home, layout, React file CRUD, Axios, hosting notes | Ibrahim Aliyu | `index.html`, `react.html`, `axios.html`, `HOSTING.md`, `react/tictactoe/` |
| JS CRUD, Fetch + PHP API, SPA calculator, `spa.html`, OOJS | Chika Chinedu David | `javascript.html`, `fetchapi.html`, `api/`, `react/calculator/`, `oojs.html` |
| Shared | Both | `styles/style.css`, README, `data/sample.json`, integration testing |

Adjust the table to match what you actually did.

---

## 4. Task 1 — Home page (`index.html`)

**Points (2):** Visually clear site; **H1** text exactly: **Web programming-1 Lecture Homework**; **footer** with both names and Neptun codes.

**Implementation:** `index.html` + `styles/style.css`. Navigation links to all pages.

**Screenshot placeholder:** Full page with header, H1, and footer visible.  
*(Insert: `screenshots/task01-home.png`)*  

---

## 5. Task 2 — JavaScript CRUD (`javascript.html`)

**Points (2):** Vanilla JS CRUD; data in an **array**; initial data from a **file** linked to the chosen database export (`data/sample.json`).

**Screenshot placeholder:** CRUD table and form after loading data.  
*(Insert: `screenshots/task02-javascript.png`)*  

---

## 6. Task 3 — React CRUD (`react.html`)

**Points (2):** React CRUD (method A — local install; built bundle in `assets/react-crud.js`); data from file.

**Screenshot placeholder:** React page with rows and form.  
*(Insert: `screenshots/task03-react.png`)*  

---

## 7. Task 4 — SPA (`spa.html`) and `react/` folders

**Points (3):** Two menu items; **two** small React apps (calculator + tic-tac-toe level); **components** and **useState** in both; `react/calculator/` and `react/tictactoe/` each contain **`src`** and **`dist`**.

**Screenshot placeholder:** SPA with Calculator tab active; second screenshot with Tic-tac-toe tab.  
*(Insert: `screenshots/task04-spa-calc.png`, `screenshots/task04-spa-ttt.png`)*  

**Where the two apps live in the repo:**

- Calculator: `react/calculator/src/`, `react/calculator/dist/app.js`  
- Tic-tac-toe: `react/tictactoe/src/`, `react/tictactoe/dist/app.js`  
- Shell: `spa.html`  

---

## 8. Task 5 — Fetch API (`fetchapi.html`)

**Points (4):** JavaScript **Fetch** + CRUD; data on **server** (PHP + MySQL or JSON fallback in dev).

**Implementation:** `api/items.php`, `api/bootstrap.php`, `fetchapi.html`.

**Screenshot placeholder:** Fetch page working against **live** server DB after deploy.  
*(Insert: `screenshots/task05-fetch.png`)*  

---

## 9. Task 6 — Axios (`axios.html`)

**Points (4):** React + **Axios** + server-side storage.

**Implementation:** `src/axios-crud.jsx`, `assets/axios-crud.js`, `axios.html`.

**Screenshot placeholder:** Axios page on live host with CRUD.  
*(Insert: `screenshots/task06-axios.png`)*  

---

## 10. Task 7 — OOJS (`oojs.html`)

**Points (3):** Object-oriented JS graphical mini-app; **class**, **constructor**, **methods**, **`document.body.appendChild`**, **`extends`**, **`super`**.

**Screenshot placeholder:** OOJS page with visible UI.  
*(Insert: `screenshots/task07-oojs.png`)*  

---

## 11. Task 8 — Internet hosting

**Points (3):** Site deployed and reachable; **PDO** on server uses host panel values (`localhost`, db name, user, password).

**Implementation notes:** See `HOSTING.md` in the repo. On the server, add **`api/config.local.php`** (not in Git) with MySQL credentials.

**Screenshot placeholder:** Browser showing **your** live homepage URL.  
*(Insert: `screenshots/task08-live-home.png`)*  

**Do not paste real passwords in this file if the PDF is shared publicly.** The teacher copy should include FTP/URL/user/password as required by the assignment.

---

## 12. Tasks 9–10 — GitHub process and authorship

**Points:** Public repo; **at least five** meaningful commits; **both** members visible in history with correct Git emails.

**Screenshot placeholder:** Commit history and contributors (can overlap with section 2).  

---

## 13. Task 11 — Documentation

**Points (2):** At least **15 pages** in PDF with screenshots and mapping of tasks.

This Markdown file is the **source** for that PDF. Export steps:

1. Add real screenshots under `documentation/screenshots/`.  
2. Export to PDF: e.g. **Pandoc** (`pandoc PROJECT-DOCUMENTATION.md -o out.pdf`), **VS Code / Cursor** with Markdown PDF extension, or **print to PDF** from a browser preview.  
3. Adjust spacing and font size so the total is **≥ 15 pages** with screenshots included.  

---

## 14. File map (quick reference)

| Task | Main files |
|------|------------|
| Home | `index.html`, `styles/style.css` |
| JS CRUD | `javascript.html`, `data/sample.json` |
| React CRUD | `react.html`, `src/react-crud.jsx`, `assets/react-crud.js` |
| SPA | `spa.html`, `react/calculator/`, `react/tictactoe/` |
| Fetch | `fetchapi.html`, `api/items.php`, `api/bootstrap.php` |
| Axios | `axios.html`, `src/axios-crud.jsx`, `assets/axios-crud.js` |
| OOJS | `oojs.html` |
| Hosting | `HOSTING.md`, `api/config.local.example.php`, `sql/items_mysql.sql` |

---

## 15. Appendix — local run commands

```bash
# PHP built-in server (API + static HTML)
php -S localhost:8080

# Rebuild React bundles after editing JSX
npm install
npm run build:react
npm run build:axios
npm run build:spa
```

Database: for local MySQL, copy `api/config.local.example.php` to `api/config.local.php` and fill XAMPP/MySQL credentials. Without MySQL, the API falls back to JSON under `data/` where applicable.

---

## Extended notes (padding for page count when printing)

### Responsiveness and structure

The site uses a shared stylesheet and a horizontal navigation menu in the header. Pages are in English as required.

### PHP PDO (hosting)

On the host, the assignment expects something like:

```php
$dbh = new PDO(
    'mysql:host=localhost;dbname=dbname1',
    'username1',
    '****',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
```

Our project uses `api/bootstrap.php` and `api/items.php` instead of a single `dbh` file, but the **same credentials** from the panel apply to the DSN in `config.local.php`.

### React method A

React is built with **esbuild** locally and committed bundles are uploaded so the host does not need Node.js.

### Security

Do not commit `api/config.local.php`, `.env`, or hosting passwords. The PDF for the teacher is the right place for check credentials.

### Group coordination

We used GitHub issues / Teams for coordination and split tasks as in section 3. Each member ran `git config user.email` with the GitHub no-reply address for their account before committing.

### End of document

Replace all *(fill in)* fields, add screenshots, export to PDF, and submit **one PDF per student** to Teams.
