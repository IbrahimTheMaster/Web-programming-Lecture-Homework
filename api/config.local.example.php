<?php
/**
 * Copy to config.local.php on hosting (Nethely, etc.) — do not commit secrets.
 * PDO line from the assignment:
 * mysql:host=localhost;dbname=dbname1
 */
return [
    'driver' => 'mysql',
    'dsn' => 'mysql:host=localhost;dbname=your_db;charset=utf8mb4',
    'user' => 'username1',
    'pass' => 'your_password',
];
