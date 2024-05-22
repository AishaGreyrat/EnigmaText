-- Creación de la base de datos llamada EnigmaText
CREATE DATABASE IF NOT EXISTS EnigmaText;
-- Usar esta base de datos
USE EnigmaText;

-- TABLAS

-- Tabla para almacenar usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Tabla para almacenar métodos de cifrado
CREATE TABLE IF NOT EXISTS metodosCifrado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla para almacenar textos
CREATE TABLE IF NOT EXISTS historial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    texto_original TEXT,
    texto_cifrado TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(255) NOT NULL PRIMARY KEY,
    expires int NOT NULL,
    data MEDIUMTEXT NOT NULL
);

-- Añadir índice a la columna id_usuario en la tabla textos
ALTER TABLE historial ADD INDEX idx_usuario (id_usuario);

INSERT INTO metodosCifrado (nombre) VALUES 
('Cifrado Cesar'),
('Base64'),
('Hexadecimal'),
('Binario');

SHOW TABLES;
SELECT * FROM sessions;
SELECT * FROM usuarios;
SELECT * FROM registros;
SELECT * FROM metodosCifrado;
SELECT * FROM historial;
SELECT * FROM textos_MetodosCifrado;


DROP DATABASE IF EXISTS EnigmaText;

INSERT INTO usuarios (nombre, email, contraseña) values
('nombre'),
 ('email'),
 ('contraseña');