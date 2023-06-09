START TRANSACTION;
DROP DATABASE IF EXISTS hospital;
DROP USER  IF EXISTS 'hospital'@'localhost';
CREATE DATABASE hospital;
USE hospital;

CREATE USER 'hospital'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON hospital.* TO 'hospital'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  code VARCHAR(20),
  rol VARCHAR(20) NOT NULL
);

CREATE TABLE departamento (
  id_departamento INT PRIMARY KEY AUTO_INCREMENT,
  departamento VARCHAR(50) NOT NULL,
  arduino VARCHAR(50) NOT NULL
);

CREATE TABLE paciente (
  dni_paciente varchar(9) PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  fec_nac DATE NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE medico (
  id_medico INT PRIMARY KEY AUTO_INCREMENT,
  dni_medico varchar(9) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  consulta VARCHAR(4) NOT NULL,
  id_departamento INT NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_departamento) REFERENCES Departamento(id_departamento) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE historial (
    dni_paciente varchar(9) PRIMARY KEY,
    antecedentes TEXT,
    medicamentos TEXT,
    vacunas TEXT,
    pruebas TEXT,
    consultas TEXT,
    cirugias TEXT,
    notas TEXT,
    FOREIGN KEY (dni_paciente) REFERENCES paciente(dni_paciente) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cita (
  id_cita INT PRIMARY KEY AUTO_INCREMENT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  proposito VARCHAR(100) NOT NULL,
  dni_paciente VARCHAR(9) NOT NULL,
  id_medico int NOT NULL,
  estado VARCHAR(14) NOT NULL,
  FOREIGN KEY (dni_paciente) REFERENCES Paciente(dni_paciente) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_medico) REFERENCES Medico(id_medico) ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE (fecha, dni_paciente, id_medico)
);

CREATE TABLE receta (
  id_receta INT PRIMARY KEY AUTO_INCREMENT,
  medicamento VARCHAR(100) NOT NULL,
  dosis VARCHAR(50) NOT NULL,
  frecuencia VARCHAR(50) NOT NULL,
  dni_paciente varchar(9) NOT NULL,
  id_medico int NOT NULL,
  FOREIGN KEY (dni_paciente) REFERENCES Paciente(dni_paciente) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_medico) REFERENCES Medico(id_medico) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO departamento (id_departamento, departamento, arduino)
VALUES 
  (NULL, 'Cardiología', '192.168.1.177'),
  (NULL, 'Neurología', '192.168.1.177'),
  (NULL, 'Pediatría', '192.168.1.177'),
  (NULL, 'Oncología', '192.168.1.177'),
  (NULL, 'Ginecología', '192.168.1.177'),
  (NULL, 'Dermatología', '192.168.1.177'),
  (NULL, 'Oftalmología', '192.168.1.177'),
  (NULL, 'Traumatología', '192.168.1.177'),
  (NULL, 'Psiquiatría', '192.168.1.177');



INSERT INTO `usuario`(`id_usuario`, `username`, `password`, `code`, `rol`) VALUES 
  (NULL, 'jupe1234', '$2y$10$0i1Ix4vfWkpMYvqSxW5WZO6IJkARA6u.NlJSrh9y.wi9aJQPeI1OG', NULL, 'paciente'),
  (NULL, 'malo1234', '$2y$10$nSJOTa4560JQYWdJOPYMsOQMZaxQoTS/Wk6GVHhOMnxly8ZNuRxmG', NULL, 'paciente'),
  (NULL, 'maga8012', '$2y$10$RBir5PGPKDEua.hnEMMwdeSUgZLLf.JQMZmYPI8nhV7PCIqdrrk7m', NULL, 'paciente'),
  (NULL, 'julo7518', '$2y$10$kl2v9xae.1XHsVroJeDBR.V6DPBMounjaLG0uNYJGoRVlRVAvzvFG', NULL, 'paciente'),
  (NULL, 'anlo9218', '$2y$10$pSDyuKFgYDka9e2ovTu4UezbGABHJuoCmX3kr6VKnppkqRc7DjfKe', NULL, 'paciente'),
  (NULL, 'dasa6789', '$2y$10$2X7z76CIBBBSkyseO2Krd.cnvCSdXQVVM9vgGravtfn.20w3rcG3m', NULL, 'paciente'),
  (NULL, 'lafe1234', '$2y$10$2X3jEEyX9gbM43tF9vI/6O6tDihgzt9HPKjCAkYDTUb.JyGavtpf2', NULL, 'paciente'),
  (NULL, 'pera1234', '$2y$10$Me3lLbrkk6iZohMP076PLOBXHsrO45crlNdUlMkKryF/Cm7YWHevK', NULL, 'paciente'),
  (NULL, 'mara6789', '$2y$10$NtxiRtpZwVBycOjoeAk6re6jYVDyMTT6SW2Cd1YGLJPPxAltQ1.Na', NULL, 'paciente'),
  (NULL, 'altr7890', '$2y$10$.0WurpBM37Ewmzn6zmYC3epMCFde2v.0X/syKHUmGCv00NDEErTqe', NULL, 'paciente'),
  (NULL, 'maro7890', '$2y$10$m8aqXs5mcUNzWU7XKg//2OkASNMSRm230EFUsvAOk7W5f/uFRJCF6', NULL, 'paciente'),
  (NULL, 'alor5678', '$2y$10$4mEHU5zfBL.4coC9qk4rb.UB0hkRdrpC6lU/YeCl9tCmoj7uyx7Ge', NULL, 'paciente'),
  (NULL, 'issi5678', '$2y$10$gto7fdPKTsTspsq1MK2fjuG6roYMEDpReeYytqB0r61ZCV4FzCOCy', NULL, 'paciente'),
  (NULL, 'javg5678', '$2y$10$ZvOhZnbJnIdtGqGVZ3OzmOkYpvqaYatpbPnZqV/z4q5KuJ5dDl8Nq', NULL, 'paciente'),
  (NULL, 'meap1234', '$2y$10$7G50RuD9LO1whf2a/DATNuAhNPqBZsjghb0a4EZRih/mPQpuzTfDW', NULL, 'admin'),
  (NULL, 'meap5678', '$2y$10$C43/rA4PwfjDNfjSByGz1OD0sqbWIBItsHIvHk3EOnVugVYUHa.BK', NULL, 'medico'),
  (NULL, 'meap9876', '$2y$10$jo/Q9WgeHK5axZHFI0LbHuQBBXrbxjwwVzahnqn6G27FJSGA8Lfjm', NULL, 'medico'),
  (NULL, 'meap2345', '$2y$10$.S9kdSxdQP7coacX3.E8VebE/LETWSOaU68Kn9NlCYkFINTZmt2oG', NULL, 'medico'),
  (NULL, 'meap6789', '$2y$10$cz/1./d89BwNMBm/4uhr.eRCzrDT04c.g/okKCiiwRQWk0jg4GCUO', NULL, 'medico'),
  (NULL, 'meap5432', '$2y$10$f7eB.WFZk26WWsLNUX27FuSBieqwDUleoSSxUSXge4Duj2p7CsNSO', NULL, 'medico'),
  (NULL, 'meap7890', '$2y$10$DympPqKfW/RBcRMnhYCZCeMD/XdZu1NXLLryvwaNtzhRpCtiMAwSK', NULL, 'medico'),
  (NULL, 'meap4567', '$2y$10$MCK9Ky3R4bugzrom2SUY6O7CDkaMA/sb8BYegPM2qViDgfZsZr1Jm', NULL, 'medico'),
  (NULL, 'meap8901', '$2y$10$V5tXV9sRBXEkSLzo3aJ0peL7tQ0uNhrykpRNSbMSeHpgLtP6Oyq/u', NULL, 'medico'),
  (NULL, 'meap3210', '$2y$10$QYqeP5Sm2rMDIXsWzyqRDOmD9UlnlihG730RA9L3zW2I.xr7INOPu', NULL, 'medico');


INSERT INTO paciente (dni_paciente, nombre, apellido, fec_nac, telefono, direccion, email, id_usuario)
VALUES 
  ('123456789', 'Juan', 'Pérez', '1990-05-15', '1234', 'Calle Principal 12', 'juan@gmail.com', 1),
  ('987654321', 'María', 'López', '1985-12-02', '1234', 'Avenida Central 6', 'maria@gmail.com', 2),
  ('12345678A', 'María', 'García Pérez', '1980-05-12', '612345678', 'Calle Mayor, 123, Madrid', '4abcgarciaoscar@gmail.com', 3),
  ('23456789B', 'Juan', 'López Rodríguez', '1975-09-18', '623456789', 'Avenida del Parque, 45, Barcelona', '4abcgarciaoscar@gmail.com', 4),
  ('34567890C', 'Ana', 'Martínez Ruiz', '1992-07-03', '634567890', 'Calle del Sol, 67, Valencia', '4abcgarciaoscar@gmail.com', 5),
  ('45678901D', 'David', 'Sánchez García', '1988-11-29', '645678901', 'Avenida Libertad, 23, Sevilla', '4abcgarciaoscar@gmail.com', 6),
  ('56789012E', 'Laura', 'Fernández López', '1979-03-14', '656789012', 'Calle del Mar, 12, Bilbao', '4abcgarciaoscar@gmail.com', 7),
  ('67890123F', 'Pedro', 'Ramírez Gómez', '1985-08-22', '667890123', 'Avenida del Río, 34, Málaga', '4abcgarciaoscar@gmail.com', 8),
  ('78901234G', 'Marta', 'Torres García', '1990-02-07', '678901234', 'Calle del Pino, 56, Zaragoza', '4abcgarciaoscar@gmail.com', 9),
  ('89012345H', 'Alberto', 'Navarro Rodríguez', '1982-06-19', '689012345', 'Avenida del Carmen, 78, Alicante', '4abcgarciaoscar@gmail.com', 10),
  ('90123456I', 'Isabel', 'Silva López', '1995-09-11', '690123456', 'Calle Mayor, 90, Granada', '4abcgarciaoscar@gmail.com', 11),
  ('01234567J', 'Javier', 'Ruiz González', '1987-12-25', '701234567', 'Avenida del Sol, 45, Valencia', '4abcgarciaoscar@gmail.com', 12);

INSERT INTO medico (dni_medico, nombre, apellido, telefono, email, consulta, id_departamento, id_usuario)
VALUES 
  ('123456789', 'Médico1', 'Apellido1', '123456789', '4abcgarciaoscar@gmail.com', 'Cons1', 1, 15),
  ('234567890', 'Médico2', 'Apellido2', '234567890', '4abcgarciaoscar@gmail.com', 'Cons2', 1, 16),
  ('345678901', 'Médico3', 'Apellido3', '345678901', '4abcgarciaoscar@gmail.com', 'Cons3', 2, 17),
  ('456789012', 'Médico4', 'Apellido4', '456789012', '4abcgarciaoscar@gmail.com', 'Cons4', 2, 18),
  ('567890123', 'Médico5', 'Apellido5', '567890123', '4abcgarciaoscar@gmail.com', 'Cons5', 3, 19),
  ('678901234', 'Médico6', 'Apellido6', '678901234', '4abcgarciaoscar@gmail.com', 'Cons6', 3, 20),
  ('789012345', 'Médico7', 'Apellido7', '789012345', '4abcgarciaoscar@gmail.com', 'Cons7', 4, 21),
  ('890123456', 'Médico8', 'Apellido8', '890123456', '4abcgarciaoscar@gmail.com', 'Cons8', 4, 22),
  ('901234567', 'Médico9', 'Apellido9', '901234567', '4abcgarciaoscar@gmail.com', 'Cons9', 5, 23),
  ('012345678', 'Médico10', 'Apellido10', '012345678', '4abcgarciaoscar@gmail.com', 'Cons10', 5, 24);


INSERT INTO historial (dni_paciente, antecedentes, medicamentos, vacunas, pruebas, consultas, cirugias, notas)
VALUES
  ('123456789', 'El paciente Juan Pérez tiene antecedentes de alergia a la penicilina. No presenta otros antecedentes médicos relevantes.', 'Actualmente está tomando paracetamol para el dolor de cabeza.', 'Ha recibido las vacunas contra la gripe y la hepatitis B.', 'Se le han realizado pruebas de sangre y orina recientemente.', 'Ha tenido consultas regulares con el médico de cabecera para el seguimiento de su presión arterial.', 'No ha sido sometido a ninguna cirugía en el pasado.', 'Se recomienda seguimiento regular para controlar su presión arterial y ajustar la medicación según sea necesario.'),
  ('987654321', 'La paciente María López no tiene antecedentes médicos relevantes.', 'No está tomando ningún medicamento en la actualidad.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'Se le han realizado pruebas de colesterol y glucosa en los últimos meses.', 'Ha tenido consultas regulares con el médico para el seguimiento de su embarazo.', 'No ha sido sometida a ninguna cirugía en el pasado.', 'El embarazo progresa sin complicaciones y se espera un parto normal.'),
  ('12345678A', 'La paciente María García Pérez tiene antecedentes de hipertensión arterial. No presenta otros antecedentes médicos relevantes.', 'Actualmente está tomando los siguientes medicamentos: enalapril para controlar la presión arterial y paracetamol para el dolor ocasional.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'Se le han realizado pruebas de glucosa y función renal recientemente.', 'Ha tenido consultas regulares con el médico de cabecera para el seguimiento de su presión arterial.', 'No ha sido sometida a ninguna cirugía en el pasado.', 'Se recomienda seguir tomando los medicamentos según las indicaciones y asistir a las consultas de seguimiento para controlar su presión arterial.'),
  ('23456789B', 'El paciente Juan López Rodríguez tiene antecedentes de alergia al marisco. No presenta otros antecedentes médicos relevantes.', 'No está tomando ningún medicamento en la actualidad.', 'Ha recibido las vacunas contra la gripe y el tétanos.', 'Se le han realizado pruebas de alergia y radiografías recientemente.', 'Ha tenido consultas ocasionales con el médico de cabecera para el tratamiento de resfriados.', 'No ha sido sometido a ninguna cirugía en el pasado.', 'Se recomienda evitar el consumo de mariscos debido a su alergia conocida.'),
  ('34567890C', 'La paciente Ana Martínez Ruiz no tiene antecedentes médicos relevantes.', 'No está tomando ningún medicamento en la actualidad.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'Se le han realizado pruebas de sangre y orina en el último año.', 'Ha tenido consultas regulares con el médico para el seguimiento de su dieta y estilo de vida saludables.', 'No ha sido sometida a ninguna cirugía en el pasado.', 'Se recomienda mantener una dieta equilibrada y realizar ejercicio regularmente para mantener una buena salud.'),
  ('45678901D', 'El paciente David Sánchez García no tiene antecedentes médicos relevantes.', 'No está tomando ningún medicamento en la actualidad.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'No se le han realizado pruebas médicas recientes.', 'Ha tenido consultas ocasionales con el médico de cabecera para el tratamiento de dolores musculares.', 'No ha sido sometido a ninguna cirugía en el pasado.', 'Se recomienda mantener una vida activa y consultar al médico si los dolores musculares persisten.'),
  ('56789012E', 'La paciente Laura Fernández López tiene antecedentes de asma. No presenta otros antecedentes médicos relevantes.', 'Está tomando un inhalador de salbutamol para el control del asma.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'Se le han realizado pruebas de función pulmonar y alergias recientemente.', 'Ha tenido consultas regulares con el médico de cabecera para el seguimiento y ajuste del tratamiento del asma.', 'No ha sido sometida a ninguna cirugía en el pasado.', 'Se recomienda llevar siempre consigo el inhalador de salbutamol y evitar los desencadenantes conocidos del asma.'),
  ('67890123F', 'El paciente Pedro Ramírez Gómez no tiene antecedentes médicos relevantes.', 'No está tomando ningún medicamento en la actualidad.', 'Ha recibido las vacunas contra la gripe y la hepatitis A.', 'No se le han realizado pruebas médicas recientes.', 'Ha tenido consultas ocasionales con el médico de cabecera para el tratamiento de resfriados.', 'No ha sido sometido a ninguna cirugía en el pasado.', 'Se recomienda mantener una dieta equilibrada y realizar ejercicio regularmente para mantener una buena salud.'),
  ('78901234G', 'La paciente Marta Torres García tiene antecedentes de diabetes tipo 2. No presenta otros antecedentes médicos relevantes.', 'Está tomando metformina y glibenclamida para controlar los niveles de azúcar en la sangre.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'Se le han realizado pruebas de hemoglobina glicosilada y función renal recientemente.', 'Ha tenido consultas regulares con el endocrinólogo para el seguimiento y ajuste del tratamiento de la diabetes.', 'No ha sido sometida a ninguna cirugía en el pasado.', 'Se recomienda seguir tomando los medicamentos según las indicaciones y realizar controles periódicos de los niveles de azúcar en la sangre.'),
  ('89012345H', 'El paciente Alberto Navarro Rodríguez no tiene antecedentes médicos relevantes.', 'No está tomando ningún medicamento en la actualidad.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'No se le han realizado pruebas médicas recientes.', 'Ha tenido consultas ocasionales con el médico de cabecera para el chequeo general de salud.', 'No ha sido sometido a ninguna cirugía en el pasado.', 'Se recomienda mantener un estilo de vida saludable y realizar chequeos regulares para detectar posibles problemas de salud.'),
  ('90123456I', 'La paciente Isabel Silva López no tiene antecedentes médicos relevantes.', 'No está tomando ningún medicamento en la actualidad.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'Se le han realizado pruebas de sangre y orina en los últimos meses.', 'Ha tenido consultas regulares con el médico de cabecera para el seguimiento de su salud general.', 'No ha sido sometida a ninguna cirugía en el pasado.', 'Se recomienda mantener un estilo de vida saludable y realizar chequeos periódicos para mantener una buena salud.'),
  ('01234567J', 'El paciente Javier Ruiz González tiene antecedentes de hipotiroidismo. No presenta otros antecedentes médicos relevantes.', 'Está tomando levotiroxina para el control del hipotiroidismo.', 'Ha recibido todas las vacunas recomendadas para su edad.', 'Se le han realizado pruebas de hormonas tiroideas y colesterol en los últimos meses.', 'Ha tenido consultas regulares con el endocrinólogo para el seguimiento y ajuste del tratamiento del hipotiroidismo.', 'No ha sido sometido a ninguna cirugía en el pasado.', 'Se recomienda seguir tomando la levotiroxina según las indicaciones y realizar controles periódicos de las hormonas tiroideas.');

INSERT INTO cita (fecha, hora, proposito, dni_paciente, id_medico, estado)
VALUES
  (CURDATE(), '10:00', 'Control de rutina', '123456789', 1, 'Pendiente'),
  (CURDATE(), '10:10', 'Consulta general', '123456789', 2, 'Pendiente'),
  (CURDATE(), '10:20', 'Control de diabetes', '123456789', 3, 'Pendiente'),
  (CURDATE(), '10:30', 'Seguimiento postoperatorio', '123456789', 4, 'Pendiente'),
  (CURDATE(), '10:40', 'Control de rutina', '987654321', 1, 'Pendiente'),
  (CURDATE(), '10:50', 'Consulta general', '987654321', 2, 'Pendiente'),
  (CURDATE(), '11:00', 'Control de diabetes', '987654321', 3, 'Pendiente'),
  (CURDATE(), '11:10', 'Seguimiento postoperatorio', '987654321', 4, 'Pendiente'),
  (CURDATE(), '11:20', 'Control de rutina', '12345678A', 1, 'Pendiente'),
  (CURDATE(), '11:30', 'Consulta general', '12345678A', 2, 'Pendiente'),
  (CURDATE(), '11:40', 'Control de diabetes', '12345678A', 3, 'Pendiente'),
  (CURDATE(), '11:50', 'Seguimiento postoperatorio', '12345678A', 4, 'Pendiente'),
  (CURDATE(), '12:00', 'Control de rutina', '23456789B', 1, 'Pendiente'),
  (CURDATE(), '12:10', 'Consulta general', '23456789B', 2, 'Pendiente'),
  (CURDATE(), '12:20', 'Control de diabetes', '23456789B', 3, 'Pendiente'),
  (CURDATE(), '12:30', 'Seguimiento postoperatorio', '23456789B', 4, 'Pendiente'),
  (CURDATE(), '12:40', 'Control de rutina', '34567890C', 1, 'Pendiente'),
  (CURDATE(), '12:50', 'Consulta general', '34567890C', 2, 'Pendiente'),
  (CURDATE(), '13:00', 'Control de diabetes', '34567890C', 3, 'Pendiente'),
  (CURDATE(), '13:10', 'Seguimiento postoperatorio', '34567890C', 4, 'Pendiente'),
  (CURDATE(), '13:20', 'Control de rutina', '45678901D', 1, 'Pendiente'),
  (CURDATE(), '13:30', 'Consulta general', '45678901D', 2, 'Pendiente'),
  (CURDATE(), '13:40', 'Control de diabetes', '45678901D', 3, 'Pendiente'),
  (CURDATE(), '13:50', 'Seguimiento postoperatorio', '45678901D', 4, 'Pendiente'),
  (CURDATE(), '14:00', 'Control de rutina', '56789012E', 1, 'Pendiente'),
  (CURDATE(), '14:10', 'Consulta general', '56789012E', 2, 'Pendiente'),
  (CURDATE(), '14:20', 'Control de diabetes', '56789012E', 3, 'Pendiente'),
  (CURDATE(), '14:30', 'Seguimiento postoperatorio', '56789012E', 4, 'Pendiente');


INSERT INTO receta (medicamento, dosis, frecuencia, dni_paciente, id_medico)
VALUES
  ('Paracetamol', '500mg', 'Cada 8 horas', '123456789', 1),
  ('Ibuprofeno', '400mg', 'Cada 12 horas', '123456789', 1),
  ('Amoxicilina', '875mg', 'Cada 24 horas', '123456789', 1),
  ('Loratadina', '10mg', 'Una vez al día', '123456789', 1),
  ('Paracetamol', '500mg', 'Cada 8 horas', '123456789', 2),
  ('Ibuprofeno', '400mg', 'Cada 12 horas', '123456789', 2),
  ('Amoxicilina', '875mg', 'Cada 24 horas', '123456789', 2),
  ('Loratadina', '10mg', 'Una vez al día', '123456789', 2),
  ('Paracetamol', '500mg', 'Cada 8 horas', '987654321', 1),
  ('Ibuprofeno', '400mg', 'Cada 12 horas', '987654321', 1),
  ('Amoxicilina', '875mg', 'Cada 24 horas', '987654321', 1),
  ('Loratadina', '10mg', 'Una vez al día', '987654321', 1),
  ('Paracetamol', '500mg', 'Cada 8 horas', '987654321', 2),
  ('Ibuprofeno', '400mg', 'Cada 12 horas', '987654321', 2),
  ('Amoxicilina', '875mg', 'Cada 24 horas', '987654321', 2),
  ('Loratadina', '10mg', 'Una vez al día', '987654321', 2),
  ('Paracetamol', '500mg', 'Cada 8 horas', '12345678A', 1),
  ('Ibuprofeno', '400mg', 'Cada 12 horas', '12345678A', 1),
  ('Amoxicilina', '875mg', 'Cada 24 horas', '12345678A', 1),
  ('Loratadina', '10mg', 'Una vez al día', '12345678A', 1),
  ('Paracetamol', '500mg', 'Cada 8 horas', '12345678A', 2),
  ('Ibuprofeno', '400mg', 'Cada 12 horas', '12345678A', 2),
  ('Amoxicilina', '875mg', 'Cada 24 horas', '12345678A', 2),
  ('Loratadina', '10mg', 'Una vez al día', '12345678A', 2),
  ('Paracetamol', '500mg', 'Cada 8 horas', '23456789B', 1),
  ('Ibuprofeno', '400mg', 'Cada 12 horas', '23456789B', 1),
  ('Amoxicilina', '875mg', 'Cada 24 horas', '23456789B', 1),
  ('Loratadina', '10mg', 'Una vez al día', '23456789B', 1),
  ('Paracetamol', '500mg', 'Cada 8 horas', '23456789B', 2),
  ('Ibuprofeno', '400mg', 'Cada 12 horas', '23456789B', 2),
  ('Amoxicilina', '875mg', 'Cada 24 horas', '23456789B', 2),
  ('Loratadina', '10mg', 'Una vez al día', '23456789B', 2),
  ('Ibuprofeno', '600mg', 'Cada 8 horas', '123456789', 1),
  ('Omeprazol', '20mg', 'Una vez al día', '123456789', 2),
  ('Amoxicilina', '500mg', 'Cada 6 horas', '123456789', 3),
  ('Loratadina', '10mg', 'Una vez al día', '123456789', 4),
  ('Paracetamol', '500mg', 'Cada 8 horas', '987654321', 1),
  ('Omeprazol', '20mg', 'Una vez al día', '987654321', 2),
  ('Amoxicilina', '500mg', 'Cada 6 horas', '987654321', 3),
  ('Loratadina', '10mg', 'Una vez al día', '987654321', 4),
  ('Ibuprofeno', '600mg', 'Cada 8 horas', '987654321', 1),
  ('Omeprazol', '20mg', 'Una vez al día', '987654321', 2),
  ('Amoxicilina', '500mg', 'Cada 6 horas', '987654321', 3),
  ('Loratadina', '10mg', 'Una vez al día', '987654321', 4),
  ('Ibuprofeno', '600mg', 'Cada 8 horas', '12345678A', 1),
  ('Omeprazol', '20mg', 'Una vez al día', '12345678A', 2),
  ('Amoxicilina', '500mg', 'Cada 6 horas', '12345678A', 3),
  ('Loratadina', '10mg', 'Una vez al día', '12345678A', 4),
  ('Paracetamol', '500mg', 'Cada 8 horas', '23456789B', 1),
  ('Omeprazol', '20mg', 'Una vez al día', '23456789B', 2),
  ('Amoxicilina', '500mg', 'Cada 6 horas', '23456789B', 3),
  ('Loratadina', '10mg', 'Una vez al día', '23456789B', 4);


COMMIT;

ROLLBACK;