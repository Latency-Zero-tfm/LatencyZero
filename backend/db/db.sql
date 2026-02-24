-- ===========================
-- Base de datos: latencyzero
-- ===========================

CREATE DATABASE IF NOT EXISTS latencyzero;
USE latencyzero;

-- ===========================
-- Tabla: user
-- ===========================
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================
-- Tabla: sessions
-- ===========================
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_name VARCHAR(100) DEFAULT 'Nueva Sesión',
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================
-- Tabla: chat
-- ===========================
CREATE TABLE IF NOT EXISTS chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_id INT NOT NULL,
    user_message TEXT NOT NULL,
    bot_message TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tools_mode ENUM('llm','ml_model','search','other') DEFAULT 'llm',
    bot_files JSON NULL,
    user_files JSON NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================
-- Tabla: opinions
-- ===========================
CREATE TABLE IF NOT EXISTS opinions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) DEFAULT NULL,
    message VARCHAR(1000) NOT NULL,
    sentiment_label VARCHAR(20) DEFAULT NULL,
    sentiment_score FLOAT DEFAULT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
