DROP DATABASE IF EXISTS hospital;
DROP USER  IF EXISTS 'hospital'@'localhost';
CREATE DATABASE hospital;
USE hospital;

CREATE USER 'hospital'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON hospital.* TO 'hospital'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE Usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  rol VARCHAR(20) NOT NULL
);

CREATE TABLE Departamento (
  id_departamento INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  arduino VARCHAR(50) NOT NULL
);

CREATE TABLE Paciente (
  dni_paciente varchar(9) PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  fec_nac DATE NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Medico (
  dni_medico varchar(9) PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  consulta VARCHAR(4) NOT NULL,
  id_departamento INT NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_departamento) REFERENCES Departamento(id_departamento),
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Historial (
  id_historial INT PRIMARY KEY AUTO_INCREMENT,
  exploracion TEXT NOT NULL,
  diagnostico TEXT NOT NULL,
  tratamiento TEXT NOT NULL,
  dni_paciente varchar(9) NOT NULL,
  FOREIGN KEY (dni_paciente) REFERENCES Paciente(dni_paciente)
);

CREATE TABLE Cita (
  id_cita INT PRIMARY KEY AUTO_INCREMENT,
  fecha DATE NOT NULL,
  proposito VARCHAR(100) NOT NULL,
  dni_paciente varchar(9) NOT NULL,
  dni_medico varchar(9) NOT NULL,
  estado varchar(10) NOT NULL,
  FOREIGN KEY (dni_paciente) REFERENCES Paciente(dni_paciente),
  FOREIGN KEY (dni_medico) REFERENCES Medico(dni_medico)
);

CREATE TABLE Receta (
  id_receta INT PRIMARY KEY AUTO_INCREMENT,
  medicamento VARCHAR(100) NOT NULL,
  dosis VARCHAR(50) NOT NULL,
  frecuencia VARCHAR(50) NOT NULL,
  dni_paciente varchar(9) NOT NULL,
  dni_medico varchar(9) NOT NULL,
  FOREIGN KEY (dni_paciente) REFERENCES Paciente(dni_paciente),
  FOREIGN KEY (dni_medico) REFERENCES Medico(dni_medico)
);

INSERT INTO `departamento` (`id_departamento`, `nombre`, `arduino`) VALUES (NULL, 'traumatologia', '192.168.1.177');
INSERT INTO `usuario`(`id_usuario`, `username`, `password`, `rol`) VALUES (NULL,'admin','$2y$10$qJbDpxbOxxEKrfQDJ87UbuMETceMokvDlzjy/xmonAKNtaGyaCGrC','admin');
INSERT INTO `medico` (`dni_medico`, `nombre`, `apellido`, `telefono`, `email`, `consulta`, `id_departamento`, `id_usuario`) VALUES ('1234', 'admin', 'admin', '111111111', '4abcgarciaoscar@gmail.com', 'tr-1', '1', '1');