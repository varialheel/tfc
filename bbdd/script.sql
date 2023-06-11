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
  consulta VARCHAR(6) NOT NULL,
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
  (NULL, 'Ginecología', '192.168.1.177');



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
  ('85421703W', 'Juan', 'Pérez', '1990-05-15', '1234', 'Calle Principal 12', 'juan@gmail.com', 1),
  ('57389399Y', 'María', 'López', '1985-12-02', '1234', 'Avenida Central 6', 'maria@gmail.com', 2),
  ('25836085R', 'María', 'García Pérez', '1980-05-12', '612345678', 'Calle Mayor, 123, Madrid', '4abcgarciaoscar@gmail.com', 3),
  ('66589710H', 'Juan', 'López Rodríguez', '1975-09-18', '623456789', 'Avenida del Parque, 45, Barcelona', '4abcgarciaoscar@gmail.com', 4),
  ('16116931A', 'Ana', 'Martínez Ruiz', '1992-07-03', '634567890', 'Calle del Sol, 67, Valencia', '4abcgarciaoscar@gmail.com', 5),
  ('17335630R', 'David', 'Sánchez García', '1988-11-29', '645678901', 'Avenida Libertad, 23, Sevilla', '4abcgarciaoscar@gmail.com', 6),
  ('26676404S', 'Laura', 'Fernández López', '1979-03-14', '656789012', 'Calle del Mar, 12, Bilbao', '4abcgarciaoscar@gmail.com', 7),
  ('82793590F', 'Pedro', 'Ramírez Gómez', '1985-08-22', '667890123', 'Avenida del Río, 34, Málaga', '4abcgarciaoscar@gmail.com', 8),
  ('04111306X', 'Marta', 'Torres García', '1990-02-07', '678901234', 'Calle del Pino, 56, Zaragoza', '4abcgarciaoscar@gmail.com', 9),
  ('60749055Y', 'Alberto', 'Navarro Rodríguez', '1982-06-19', '689012345', 'Avenida del Carmen, 78, Alicante', '4abcgarciaoscar@gmail.com', 10),
  ('82277570S', 'Isabel', 'Silva López', '1995-09-11', '690123456', 'Calle Mayor, 90, Granada', '4abcgarciaoscar@gmail.com', 11),
  ('61505275D', 'Javier', 'Ruiz González', '1987-12-25', '701234567', 'Avenida del Sol, 45, Valencia', '4abcgarciaoscar@gmail.com', 12);

INSERT INTO medico (id_medico,dni_medico, nombre, apellido, telefono, email, consulta, id_departamento, id_usuario)
VALUES 
  (NULL,'11373919M', 'Médico1', 'Apellido1', '123456789', '4abcgarciaoscar@gmail.com', 'Cons1', 1, 15),
  (NULL,'75228739V', 'Médico2', 'Apellido2', '234567890', '4abcgarciaoscar@gmail.com', 'Cons2', 1, 16),
  (NULL,'64610917F', 'Médico3', 'Apellido3', '345678901', '4abcgarciaoscar@gmail.com', 'Cons3', 2, 17),
  (NULL,'83904441G', 'Médico4', 'Apellido4', '456789012', '4abcgarciaoscar@gmail.com', 'Cons4', 2, 18),
  (NULL,'50221124A', 'Médico5', 'Apellido5', '567890123', '4abcgarciaoscar@gmail.com', 'Cons5', 3, 19),
  (NULL,'43289746C', 'Médico6', 'Apellido6', '678901234', '4abcgarciaoscar@gmail.com', 'Cons6', 3, 20),
  (NULL,'42402437M', 'Médico7', 'Apellido7', '789012345', '4abcgarciaoscar@gmail.com', 'Cons7', 4, 21),
  (NULL,'98097850K', 'Médico8', 'Apellido8', '890123456', '4abcgarciaoscar@gmail.com', 'Cons8', 4, 22),
  (NULL,'30598468G', 'Médico9', 'Apellido9', '901234567', '4abcgarciaoscar@gmail.com', 'Cons9', 5, 23),
  (NULL,'40306826Q', 'Médico10', 'Apellido10', '012345678', '4abcgarciaoscar@gmail.com', 'Cons10', 5, 24);
INSERT INTO historial (dni_paciente, antecedentes, medicamentos, vacunas, pruebas, consultas, cirugias, notas)
VALUES 
  ('85421703W', 
    'El paciente Juan Pérez tiene antecedentes familiares de diabetes y enfermedades cardíacas. Además, ha sufrido de alergias estacionales en el pasado. Ha llevado un estilo de vida saludable y ha sido activo físicamente. No fuma ni consume alcohol. Actualmente, sigue una dieta equilibrada y realiza ejercicio regularmente.', 
    'Paracetamol 500mg, Ibuprofeno 400mg', 
    'Vacuna contra la gripe (2021)', 
    'Análisis de sangre completo, Radiografía de tórax', 
    'Consulta de seguimiento por dolor abdominal', 
    'N/A', 
    'El paciente se muestra preocupado por los síntomas y solicita más información sobre el tratamiento recomendado. Se le brinda orientación sobre cambios en el estilo de vida y se programan pruebas adicionales.'),  
  ('57389399Y', 
    'La paciente María López no tiene antecedentes médicos significativos. Ha mantenido un estilo de vida saludable y ha seguido las recomendaciones para prevenir enfermedades. Realiza ejercicio regularmente y sigue una dieta equilibrada. No fuma ni consume alcohol. Ha recibido todas las vacunas recomendadas y ha realizado chequeos médicos regulares.', 
    'N/A', 
    'N/A', 
    'N/A', 
    'Consulta inicial para chequeo general', 
    'N/A', 
    'La paciente informa sentirse en buen estado de salud y no presenta quejas o síntomas. Se le recuerda la importancia de mantener un estilo de vida saludable y se programa una próxima consulta de seguimiento.'),  
  ('25836085R', 
    'La paciente María García Pérez ha sido diagnosticada previamente con hipertensión y ha sido tratada con éxito con medicamentos antihipertensivos. No se registran otros antecedentes médicos relevantes. Ha llevado un estilo de vida saludable y ha realizado cambios en la alimentación para controlar la presión arterial. Realiza ejercicio regularmente y ha perdido peso.', 
    'Losartan 50mg, Hidroclorotiazida 25mg', 
    'Vacuna contra la influenza (2022)', 
    'Ecocardiograma, Examen de glucemia en ayunas', 
    'Consulta de seguimiento para ajuste de medicación', 
    'N/A', 
    'La paciente menciona que ha estado siguiendo una dieta saludable y realizando ejercicio regularmente. Ha notado una mejora en su presión arterial y se siente motivada para continuar con su plan de tratamiento.'),  
  ('66589710H', 
    'El paciente Juan López Rodríguez tiene antecedentes familiares de enfermedades cardíacas. Ha llevado un estilo de vida saludable y ha realizado chequeos médicos regulares. No fuma ni consume alcohol. Actualmente, sigue una dieta equilibrada y realiza ejercicio regularmente. No se registran otros antecedentes médicos significativos.', 
    'N/A', 
    'Vacuna contra la gripe (2021)', 
    'Análisis de sangre completo, Radiografía de tórax', 
    'Consulta de seguimiento por dolor de espalda', 
    'N/A', 
    'El paciente menciona que ha estado siguiendo las recomendaciones de estilo de vida saludable y se siente satisfecho con los resultados obtenidos.'),  
  ('16116931A', 
    'La paciente Ana Martínez Ruiz ha mantenido un estilo de vida saludable y ha seguido las recomendaciones para prevenir enfermedades. Realiza ejercicio regularmente y sigue una dieta equilibrada. No fuma ni consume alcohol. Ha recibido todas las vacunas recomendadas y ha realizado chequeos médicos regulares. No se registran antecedentes médicos significativos.', 
    'N/A', 
    'N/A', 
    'N/A', 
    'Consulta inicial para chequeo general', 
    'N/A', 
    'La paciente informa sentirse en buen estado de salud y no presenta quejas o síntomas. Se le recuerda la importancia de mantener un estilo de vida saludable y se programa una próxima consulta de seguimiento.'),  
  ('17335630R', 
    'El paciente David Sánchez García no tiene antecedentes médicos significativos. Ha mantenido un estilo de vida saludable y ha seguido las recomendaciones para prevenir enfermedades. Realiza ejercicio regularmente y sigue una dieta equilibrada. No fuma ni consume alcohol. Ha recibido todas las vacunas recomendadas y ha realizado chequeos médicos regulares.', 
    'N/A', 
    'N/A', 
    'N/A', 
    'Consulta inicial para chequeo general', 
    'N/A', 
    'El paciente informa sentirse en buen estado de salud y no presenta quejas o síntomas. Se le recuerda la importancia de mantener un estilo de vida saludable y se programa una próxima consulta de seguimiento.'),  
  ('26676404S', 
    'La paciente Laura Fernández López tiene antecedentes familiares de diabetes. Ha llevado un estilo de vida saludable y ha sido activa físicamente. No fuma ni consume alcohol. Actualmente, sigue una dieta equilibrada y realiza ejercicio regularmente. No se registran otros antecedentes médicos significativos.', 
    'N/A', 
    'N/A', 
    'N/A', 
    'Consulta de seguimiento para control de peso', 
    'N/A', 
    'La paciente menciona que ha estado siguiendo una dieta saludable y realizando ejercicio regularmente. Ha logrado mantener su peso bajo control y se siente motivada para continuar con su estilo de vida saludable.'),  
  ('82793590F', 
    'El paciente Pedro Ramírez Gómez ha sido diagnosticado previamente con hipertensión y ha sido tratado con éxito con medicamentos antihipertensivos. Ha llevado un estilo de vida saludable y ha realizado cambios en la alimentación para controlar la presión arterial. Realiza ejercicio regularmente y ha perdido peso. No se registran otros antecedentes médicos relevantes.', 
    'Losartan 50mg, Hidroclorotiazida 25mg', 
    'Vacuna contra la influenza (2022)', 
    'Ecocardiograma, Examen de glucemia en ayunas', 
    'Consulta de seguimiento para ajuste de medicación', 
    'N/A', 
    'El paciente menciona que ha estado siguiendo una dieta saludable y realizando ejercicio regularmente. Ha notado una mejora en su presión arterial y se siente motivado para continuar con su plan de tratamiento.'),  
  ('04111306X', 
    'La paciente Marta Torres García ha mantenido un estilo de vida saludable y ha seguido las recomendaciones para prevenir enfermedades. Realiza ejercicio regularmente y sigue una dieta equilibrada. No fuma ni consume alcohol. Ha recibido todas las vacunas recomendadas y ha realizado chequeos médicos regulares. No se registran antecedentes médicos significativos.', 
    'N/A', 
    'N/A', 
    'N/A', 
    'Consulta inicial para chequeo general', 
    'N/A', 
    'La paciente informa sentirse en buen estado de salud y no presenta quejas o síntomas. Se le recuerda la importancia de mantener un estilo de vida saludable y se programa una próxima consulta de seguimiento.'),  
  ('60749055Y', 
    'El paciente Alberto Navarro Rodríguez ha sido diagnosticado previamente con diabetes tipo 2. Ha llevado un estilo de vida saludable y ha realizado cambios en la alimentación para controlar los niveles de azúcar en sangre. Realiza ejercicio regularmente. No se registran otros antecedentes médicos relevantes.', 
    'Metformina 500mg, Insulina Lantus', 
    'Vacuna contra la influenza (2022)', 
    'Examen de glucemia en ayunas, HbA1c', 
    'Consulta de seguimiento para ajuste de medicación', 
    'N/A', 
    'El paciente menciona que ha estado siguiendo una dieta saludable y realizando ejercicio regularmente. Ha notado una mejora en el control de su diabetes y se siente motivado para continuar con su plan de tratamiento.'),  
  ('82277570S', 
    'La paciente Isabel Silva López tiene antecedentes familiares de enfermedades cardíacas. Ha llevado un estilo de vida saludable y ha realizado chequeos médicos regulares. No fuma ni consume alcohol. Actualmente, sigue una dieta equilibrada y realiza ejercicio regularmente. No se registran otros antecedentes médicos significativos.', 
    'N/A', 
    'Vacuna contra la gripe (2021)', 
    'Análisis de sangre completo, Radiografía de tórax', 
    'Consulta de seguimiento para control de presión arterial', 
    'N/A', 
    'La paciente menciona que ha estado siguiendo las recomendaciones de estilo de vida saludable y se siente satisfecha con los resultados obtenidos.'),  
  ('61505275D', 
    'El paciente Javier Ruiz González no tiene antecedentes médicos significativos. Ha mantenido un estilo de vida saludable y ha seguido las recomendaciones para prevenir enfermedades. Realiza ejercicio regularmente y sigue una dieta equilibrada. No fuma ni consume alcohol. Ha recibido todas las vacunas recomendadas y ha realizado chequeos médicos regulares.', 
    'N/A', 
    'N/A', 
    'N/A', 
    'Consulta inicial para chequeo general', 
    'N/A', 
    'El paciente informa sentirse en buen estado de salud y no presenta quejas o síntomas. Se le recuerda la importancia de mantener un estilo de vida saludable y se programa una próxima consulta de seguimiento.');

INSERT INTO cita (fecha, hora, proposito, dni_paciente, id_medico, estado)
VALUES
    (CURDATE(), '08:00:00', 'Consulta de rutina', '85421703W', 1, 'Pendiente'),
    (CURDATE(), '08:10:00', 'Control de presión arterial', '85421703W', 2, 'Pendiente'),
    (CURDATE(), '08:20:00', 'Seguimiento de tratamiento', '85421703W', 3, 'Pendiente'),
    (CURDATE(), '08:30:00', 'Revisiones postoperatorias', '85421703W', 4, 'Pendiente'),
    (CURDATE(), '08:40:00', 'Consulta por síntomas respiratorios', '85421703W', 5, 'Pendiente'),
    (CURDATE(), '08:50:00', 'Control de diabetes', '85421703W', 6, 'Pendiente'),
    (CURDATE(), '09:00:00', 'Consulta por dolor abdominal', '85421703W', 7, 'Pendiente'),
    (CURDATE(), '09:10:00', 'Control de colesterol', '85421703W', 8, 'Pendiente'),
    (CURDATE(), '09:20:00', 'Seguimiento de enfermedad crónica', '85421703W', 9, 'Pendiente'),
    (CURDATE(), '09:30:00', 'Consulta de bienestar general', '85421703W', 10, 'Pendiente'),
    (CURDATE(), '08:10:00', 'Consulta de rutina', '57389399Y', 1, 'Pendiente'),
    (CURDATE(), '08:20:00', 'Control de presión arterial', '57389399Y', 2, 'Pendiente'),
    (CURDATE(), '08:30:00', 'Seguimiento de tratamiento', '57389399Y', 3, 'Pendiente'),
    (CURDATE(), '08:40:00', 'Revisiones postoperatorias', '57389399Y', 4, 'Pendiente'),
    (CURDATE(), '08:50:00', 'Consulta por síntomas respiratorios', '57389399Y', 5, 'Pendiente'),
    (CURDATE(), '09:00:00', 'Control de diabetes', '57389399Y', 6, 'Pendiente'),
    (CURDATE(), '09:10:00', 'Consulta por dolor abdominal', '57389399Y', 7, 'Pendiente'),
    (CURDATE(), '09:20:00', 'Control de colesterol', '57389399Y', 8, 'Pendiente'),
    (CURDATE(), '09:30:00', 'Seguimiento de enfermedad crónica', '57389399Y', 9, 'Pendiente'),
    (CURDATE(), '09:40:00', 'Consulta de bienestar general', '57389399Y', 10, 'Pendiente'),
    (CURDATE(), '08:20:00', 'Consulta de rutina', '25836085R', 1, 'Pendiente'),
    (CURDATE(), '08:30:00', 'Control de presión arterial', '25836085R', 2, 'Pendiente'),
    (CURDATE(), '08:40:00', 'Seguimiento de tratamiento', '25836085R', 3, 'Pendiente'),
    (CURDATE(), '08:50:00', 'Revisiones postoperatorias', '25836085R', 4, 'Pendiente'),
    (CURDATE(), '09:00:00', 'Consulta por síntomas respiratorios', '25836085R', 5, 'Pendiente'),
    (CURDATE(), '09:10:00', 'Control de diabetes', '25836085R', 6, 'Pendiente'),
    (CURDATE(), '09:20:00', 'Consulta por dolor abdominal', '25836085R', 7, 'Pendiente'),
    (CURDATE(), '09:30:00', 'Control de colesterol', '25836085R', 8, 'Pendiente'),
    (CURDATE(), '09:40:00', 'Seguimiento de enfermedad crónica', '25836085R', 9, 'Pendiente'),
    (CURDATE(), '09:50:00', 'Consulta de bienestar general', '25836085R', 10, 'Pendiente'),
    (CURDATE(), '08:30:00', 'Consulta de rutina', '66589710H', 1, 'Pendiente'),
    (CURDATE(), '08:40:00', 'Control de presión arterial', '66589710H', 2, 'Pendiente'),
    (CURDATE(), '08:50:00', 'Seguimiento de tratamiento', '66589710H', 3, 'Pendiente'),
    (CURDATE(), '09:00:00', 'Revisiones postoperatorias', '66589710H', 4, 'Pendiente'),
    (CURDATE(), '09:10:00', 'Consulta por síntomas respiratorios', '66589710H', 5, 'Pendiente'),
    (CURDATE(), '09:20:00', 'Control de diabetes', '66589710H', 6, 'Pendiente'),
    (CURDATE(), '09:30:00', 'Consulta por dolor abdominal', '66589710H', 7, 'Pendiente'),
    (CURDATE(), '09:40:00', 'Control de colesterol', '66589710H', 8, 'Pendiente'),
    (CURDATE(), '09:50:00', 'Seguimiento de enfermedad crónica', '66589710H', 9, 'Pendiente'),
    (CURDATE(), '10:00:00', 'Consulta de bienestar general', '66589710H', 10, 'Pendiente');

INSERT INTO receta (medicamento, dosis, frecuencia, dni_paciente, id_medico) VALUES
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '85421703W', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '85421703W', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '85421703W', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '85421703W', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '57389399Y', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '57389399Y', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '57389399Y', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '57389399Y', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '25836085R', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '25836085R', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '25836085R', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '25836085R', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '66589710H', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '66589710H', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '66589710H', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '66589710H', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '16116931A', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '16116931A', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '16116931A', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '16116931A', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '17335630R', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '17335630R', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '17335630R', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '17335630R', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '26676404S', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '26676404S', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '26676404S', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '26676404S', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '82793590F', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '82793590F', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '82793590F', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '82793590F', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '04111306X', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '04111306X', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '04111306X', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '04111306X', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '60749055Y', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '60749055Y', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '60749055Y', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '60749055Y', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '82277570S', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '82277570S', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '82277570S', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '82277570S', 4),
    ('Medicamento1', 'Dosis1', 'Frecuencia1', '61505275D', 1),
    ('Medicamento2', 'Dosis2', 'Frecuencia2', '61505275D', 2),
    ('Medicamento3', 'Dosis3', 'Frecuencia3', '61505275D', 3),
    ('Medicamento4', 'Dosis4', 'Frecuencia4', '61505275D', 4);

COMMIT;

ROLLBACK;