<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($useJsonFallback) {
    hw_items_json($method);
    exit;
}

/** @var PDO $pdo */
hw_items_pdo($pdo, $method);
exit;

function hw_items_pdo(PDO $pdo, string $method): void
{
    try {
        if ($method === 'GET') {
            $stmt = $pdo->query('SELECT id, title, detail FROM items ORDER BY id ASC');
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
            return;
        }

        if ($method === 'POST') {
            $raw = file_get_contents('php://input');
            $body = json_decode($raw ?? '', true);
            if (!is_array($body)) {
                http_response_code(400);
                echo json_encode(['error' => 'invalid json']);
                return;
            }
            $title = isset($body['title']) ? trim((string) $body['title']) : '';
            $detail = isset($body['detail']) ? trim((string) $body['detail']) : '';
            if ($title === '' || $detail === '') {
                http_response_code(400);
                echo json_encode(['error' => 'title and detail required']);
                return;
            }
            $q = $pdo->prepare('INSERT INTO items (title, detail) VALUES (?, ?)');
            $q->execute([$title, $detail]);
            $id = (int) $pdo->lastInsertId();
            http_response_code(201);
            echo json_encode(['id' => $id, 'title' => $title, 'detail' => $detail]);
            return;
        }

        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        if ($id < 1) {
            http_response_code(400);
            echo json_encode(['error' => 'missing id']);
            return;
        }

        if ($method === 'PUT' || $method === 'PATCH') {
            $raw = file_get_contents('php://input');
            $body = json_decode($raw ?? '', true);
            if (!is_array($body)) {
                http_response_code(400);
                echo json_encode(['error' => 'invalid json']);
                return;
            }
            $title = isset($body['title']) ? trim((string) $body['title']) : '';
            $detail = isset($body['detail']) ? trim((string) $body['detail']) : '';
            if ($title === '' || $detail === '') {
                http_response_code(400);
                echo json_encode(['error' => 'title and detail required']);
                return;
            }
            $q = $pdo->prepare('UPDATE items SET title = ?, detail = ? WHERE id = ?');
            $q->execute([$title, $detail, $id]);
            if ($q->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'not found']);
                return;
            }
            echo json_encode(['id' => $id, 'title' => $title, 'detail' => $detail]);
            return;
        }

        if ($method === 'DELETE') {
            $q = $pdo->prepare('DELETE FROM items WHERE id = ?');
            $q->execute([$id]);
            if ($q->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'not found']);
                return;
            }
            http_response_code(204);
            return;
        }

        http_response_code(405);
        echo json_encode(['error' => 'method not allowed']);
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['error' => 'server error']);
    }
}

function hw_items_json(string $method): void
{
    try {
        $rows = hw_json_read();

        if ($method === 'GET') {
            echo json_encode(array_values($rows));
            return;
        }

        if ($method === 'POST') {
            $raw = file_get_contents('php://input');
            $body = json_decode($raw ?? '', true);
            if (!is_array($body)) {
                http_response_code(400);
                echo json_encode(['error' => 'invalid json']);
                return;
            }
            $title = isset($body['title']) ? trim((string) $body['title']) : '';
            $detail = isset($body['detail']) ? trim((string) $body['detail']) : '';
            if ($title === '' || $detail === '') {
                http_response_code(400);
                echo json_encode(['error' => 'title and detail required']);
                return;
            }
            $next = 1;
            foreach ($rows as $r) {
                if (isset($r['id']) && (int) $r['id'] >= $next) {
                    $next = (int) $r['id'] + 1;
                }
            }
            $row = ['id' => $next, 'title' => $title, 'detail' => $detail];
            $rows[] = $row;
            hw_json_write($rows);
            http_response_code(201);
            echo json_encode($row);
            return;
        }

        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        if ($id < 1) {
            http_response_code(400);
            echo json_encode(['error' => 'missing id']);
            return;
        }

        if ($method === 'PUT' || $method === 'PATCH') {
            $raw = file_get_contents('php://input');
            $body = json_decode($raw ?? '', true);
            if (!is_array($body)) {
                http_response_code(400);
                echo json_encode(['error' => 'invalid json']);
                return;
            }
            $title = isset($body['title']) ? trim((string) $body['title']) : '';
            $detail = isset($body['detail']) ? trim((string) $body['detail']) : '';
            if ($title === '' || $detail === '') {
                http_response_code(400);
                echo json_encode(['error' => 'title and detail required']);
                return;
            }
            $found = false;
            foreach ($rows as $i => $r) {
                if (isset($r['id']) && (int) $r['id'] === $id) {
                    $rows[$i] = ['id' => $id, 'title' => $title, 'detail' => $detail];
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                http_response_code(404);
                echo json_encode(['error' => 'not found']);
                return;
            }
            hw_json_write($rows);
            echo json_encode(['id' => $id, 'title' => $title, 'detail' => $detail]);
            return;
        }

        if ($method === 'DELETE') {
            $out = [];
            $found = false;
            foreach ($rows as $r) {
                if (isset($r['id']) && (int) $r['id'] === $id) {
                    $found = true;
                    continue;
                }
                $out[] = $r;
            }
            if (!$found) {
                http_response_code(404);
                echo json_encode(['error' => 'not found']);
                return;
            }
            hw_json_write($out);
            http_response_code(204);
            return;
        }

        http_response_code(405);
        echo json_encode(['error' => 'method not allowed']);
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['error' => 'server error']);
    }
}
