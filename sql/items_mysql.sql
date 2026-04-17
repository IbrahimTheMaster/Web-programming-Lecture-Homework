-- Import on hosting MySQL (phpMyAdmin or panel) before using Fetch/Axios against live DB.
-- Table matches api/bootstrap.php expectations.

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  detail VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
