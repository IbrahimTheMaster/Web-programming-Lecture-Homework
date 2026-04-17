# Web-programming-Lecture-Homework

Course homework repo — pair work, site in English, public GitHub so the teacher can check commits and history.

We’re Ibrahim and Chika; links below. Commits should show who did what (different machines / `git config` per person).

**Ibrahim Aliyu** — https://github.com/IbrahimTheMaster  
**Chika Chinedu David** — https://github.com/king2245  

---

There’s a `docs/` folder with our notes (collaboration, SSH, who pushes how). It’s in `.gitignore` so it doesn’t land on GitHub; if you’re the other half of the pair and you only cloned this repo, ask for that folder on Teams.

Same for anything named like `*.private.*` — local only.

Hand-in for the course is the PDF (Teams), not this repo. The PDF still has to explain who built which part.

---

**Run locally**

- Static pages: `php -S localhost:8080` from this folder (or any static server).
- **React page:** run `npm install` once, then `npm run build:react` if you edit `src/react-crud.jsx`. The built `assets/react-crud.js` is in the repo so hosting works without Node.
