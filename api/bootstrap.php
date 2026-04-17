<?php
declare(strict_types=1);

/**
 * Prefer MySQL (hosting / local XAMPP) via config.local.php,
 * else SQLite if the extension exists,
 * else $useJsonFallback = true (data/items.json via PHP).
 */
$pdo = null;
$useJsonFallback = false;

$local = __DIR__ . '/config.local.php';
if (is_readable($local)) {
    $cfg = include $local;
    if (is_array($cfg) && ($cfg['driver'] ?? '') === 'mysql' && !empty($cfg['dsn'])) {
        try {
            $pdo = new PDO(
                (string) $cfg['dsn'],
                (string) ($cfg['user'] ?? ''),
                (string) ($cfg['pass'] ?? ''),
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
            $pdo->exec(
                'CREATE TABLE IF NOT EXISTS items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    detail VARCHAR(500) NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
            );
        } catch (Throwable $e) {
            $pdo = null;
        }
    }
}

if ($pdo === null && extension_loaded('pdo_sqlite')) {
    try {
        $dbPath = dirname(__DIR__) . '/data/homework.sqlite';
        $pdo = new PDO('sqlite:' . $dbPath, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
        $pdo->exec(
            'CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                detail TEXT NOT NULL
            )'
        );
    } catch (Throwable $e) {
        $pdo = null;
    }
}

if ($pdo === null) {
    $useJsonFallback = true;
}

require_once __DIR__ . '/storage.php';
