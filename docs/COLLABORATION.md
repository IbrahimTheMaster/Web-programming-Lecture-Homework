# Collaboration — Ibrahim Aliyu and Chika Chinedu David

The professor must see **which person** created **which part** in Git history. Each member commits using **their own** Git author identity (`user.name` + `user.email` matching their GitHub account).

## Roles

| Who | Full name | GitHub | Responsibility |
|-----|-----------|--------|------------------|
| Ibrahim | **Ibrahim Aliyu** | `IbrahimTheMaster` | Repository **owner**; creates the repo (or owns it), invites Chika, deploys hosting if your pair uses one account for the live site. |
| King | **Chika Chinedu David** | `king2245` | **Collaborator**; clones the repo, branches/commits with **his** identity. |

---

## Part A — Ibrahim (first)

### 1. GitHub account

1. Sign up at [https://github.com](https://github.com) (or log in) as **Ibrahim**.
2. Confirm email if GitHub asks.

### 2. Repository (this homework project)

1. Create a **public** repository, e.g. `Web-programming-Lecture-Homework`, on **IbrahimTheMaster**’s GitHub account.
2. Add `origin` to match that URL, then push. If GitHub already has a default README, pull once and merge, or use an empty repo.

### 3. Git identity on Ibrahim’s computer (before commits)

In **this** repository folder only (recommended):

```bash
cd /path/to/Web-programming-Lecture-Homework
git config user.name "Ibrahim Aliyu"
git config user.email "aliyuibraheem21@mail.com"
```

This must match the email **verified** on **IbrahimTheMaster** (GitHub → Settings → Emails). Set it again on each machine after cloning if needed.

### 4. Authentication to push as Ibrahim

Pick **one**:

- **HTTPS:** use a [Personal Access Token](https://github.com/settings/tokens) (classic: `repo` scope) as the password when `git push` asks.
- **SSH:** add an SSH key to **Ibrahim’s** GitHub (Settings → SSH keys), then:

```bash
git remote set-url origin git@github.com:IbrahimTheMaster/Web-programming-Lecture-Homework.git
git push -u origin main
```

If this PC has **several GitHub accounts**, you may use an SSH **`Host` alias** in `~/.ssh/config` (e.g. `github-account1`) so this repo uses **Ibrahim’s** key:

```bash
git remote set-url origin git@github-account1:IbrahimTheMaster/Web-programming-Lecture-Homework.git
git push -u origin main
```

If Git over **HTTPS** keeps using the wrong account, prefer **SSH** for this repo or clear cached credentials.

### 5. Invite Chika (King)

1. On GitHub: **Repository → Settings → Collaborators → Add people**.
2. Enter **`king2245`** (Chika Chinedu David) → **Invite**.
3. Chika must **accept** the email/GitHub notification.

---

## Part B — Chika Chinedu David (after invite)

### 1. GitHub account

Chika creates/logs into **his own** GitHub (not Ibrahim’s).

### 2. Clone and identity

```bash
git clone https://github.com/IbrahimTheMaster/Web-programming-Lecture-Homework.git
cd Web-programming-Lecture-Homework
git config user.name "Chika Chinedu David"
git config user.email "chikachineduss2@gmail.com"
```

Use the **same email** as on **`king2245`** (GitHub → Settings → Emails); must be verified on GitHub.

Verify:

```bash
git config user.name
git config user.email
```

### 3. Work and push

Chika can push to `main` (or use feature branches + pull requests). Every commit he makes will show **his** name if `user.name` / `user.email` are set **before** committing.

```bash
git add .
git commit -m "Describe change"
git push origin main
```

Chika must authenticate as **himself** (PAT for HTTPS, or SSH key on **`king2245`** GitHub).

---

## One computer, two GitHub accounts (optional)

If **both** people use the **same** PC, use **separate** authentication:

- **SSH:** two keys; in `~/.ssh/config` use different `Host` aliases and `IdentityFile` per account, then set `remote` URL to match the right host alias.
- **HTTPS:** use different PATs; clear cached credentials when switching (`git credential reject` or OS keychain).

Easiest for pairs: **each person uses their own laptop** with their own Git config.

---

## Checklist (grading)

- [ ] Repo is **public**.
- [ ] At least **5** meaningful commits (not one giant upload).
- [ ] History shows commits from **both** Ibrahim Aliyu and Chika Chinedu David (different authors).
- [ ] PDF documentation states who did which task (separate from this file).
