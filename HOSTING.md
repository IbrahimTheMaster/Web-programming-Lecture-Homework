# Deploying this site (task 8 — hosting)

Do **not** put FTP passwords or DB passwords in Git. Put them only in the **PDF** for the teacher.

## 1. Create MySQL on the host

In your hosting panel (InfinityFree, Nethely, etc.):

- Create a database and a MySQL user with access to it.
- Note: **host** (often `localhost` on shared hosting), **database name**, **username**, **password**.

## 2. Import schema (optional)

Open **phpMyAdmin** (or the host’s SQL tool) and run:

`sql/items_mysql.sql`

Or let PHP create the table automatically — `api/bootstrap.php` runs `CREATE TABLE IF NOT EXISTS` when MySQL is connected.

## 3. Upload files

Upload the whole project (HTML, `api/`, `assets/`, `data/`, `react/…/dist`, `styles/`, etc.) to your **public** web root (e.g. `public_html`).

Ensure **PHP** is enabled (usually `.php` files run automatically).

## 4. Server-only config (secrets)

On the server only:

1. Copy `api/config.local.example.php` to **`api/config.local.php`** (this file is **gitignored**).
2. Fill in real DSN, user, and password from the panel:

```php
<?php
return [
    'driver' => 'mysql',
    'dsn' => 'mysql:host=localhost;dbname=YOUR_DB_NAME;charset=utf8mb4',
    'user' => 'YOUR_DB_USER',
    'pass' => 'YOUR_DB_PASSWORD',
];
```

Use **`localhost`** for the host if the provider says so (common on shared hosting).

## 5. Test live

Open in the browser:

- `https://YOUR-DOMAIN/`
- `https://YOUR-DOMAIN/fetchapi.html` — list/add/edit/delete rows (server DB).
- `https://YOUR-DOMAIN/axios.html` — same API via Axios.

If something fails, check PHP error logs in the hosting panel and that `api/items.php` is reachable.

## 6. Node / build on hosting

Free PHP hosts usually **do not** run `npm`. The repo already includes built files under `assets/` and `react/*/dist/`. After local `npm run build:…`, upload again if you change JSX.

## 7. What to write in the PDF

- Public **site URL**
- **GitHub** repo URL (already public)
- **FTP** or panel URL, **username**, **password** for the teacher to check the live site — **not** in this repo.
