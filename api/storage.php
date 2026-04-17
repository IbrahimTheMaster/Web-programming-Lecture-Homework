<?php
declare(strict_types=1);

/**
 * Loads items from JSON file (server-side fallback when PDO is not configured).
 */
function hw_json_path(): string
{
    return dirname(__DIR__) . '/data/items.json';
}

function hw_json_read(): array
{
    $p = hw_json_path();
    if (!is_readable($p)) {
        return [];
    }
    $raw = file_get_contents($p);
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function hw_json_write(array $rows): void
{
    $p = hw_json_path();
    $dir = dirname($p);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    file_put_contents(
        $p,
        json_encode(array_values($rows), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        LOCK_EX
    );
}
