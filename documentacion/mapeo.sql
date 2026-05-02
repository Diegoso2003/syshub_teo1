CREATE DATABASE syshub;

CREATE TABLE Rol(
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO Rol (nombre) VALUES ('ESTUDIANTE'),('ADMINISTRADOR'),('MODERADOR'),('AUXILIAR');

CREATE TABLE Usuario(
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nombre VARCHAR(250) NOT NULL,
	rol INTEGER NOT NULL,
	email VARCHAR(150) UNIQUE NOT NULL,
	estado BOOL NOT NULL DEFAULT true,
	password VARCHAR(60) NOT NULL,
	CONSTRAINT rol_usuario FOREIGN KEY (rol) REFERENCES Rol(id)
);

CREATE TABLE Proyecto (
    	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    	usuario_id INTEGER NOT NULL,
    	titulo VARCHAR(150) NOT NULL,
    	description TEXT NOT NULL,
    	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    	tech_stack TEXT NOT NULL,
    	estado BOOLEAN NOT NULL DEFAULT true,
    	CONSTRAINT guardados_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Curadoria (
    	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    	proyecto_id INTEGER UNIQUE NOT NULL,
    	auxiliar INTEGER NOT NULL,
    	titulo VARCHAR(150), 
    	estado BOOLEAN NOT NULL DEFAULT true,
    	description TEXT,
    	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	CONSTRAINT auxiliar_curadoria FOREIGN KEY (auxiliar) REFERENCES Usuario(id),
    	CONSTRAINT proyecto_fk FOREIGN KEY (proyecto_id) REFERENCES Proyecto(id)
);

CREATE TABLE Etiqueta (
    	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    	nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Post (
    	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    	usuario_id INTEGER NOT NULL,
    	titulo VARCHAR(200),
    	contenido TEXT NOT NULL,
    	blog BOOLEAN NOT NULL,
    	estado BOOLEAN NOT NULL DEFAULT true,
	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	CONSTRAINT fk_posts_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TYPE estado_reporte AS ENUM ('pendiente','revisada','rechazada');

CREATE TABLE PostCategoria (
    	post_id INT,
    	category_id INT,
    	PRIMARY KEY (post_id, category_id),
    	CONSTRAINT fk_pc_post FOREIGN KEY (post_id) REFERENCES Post(id),
    	CONSTRAINT fk_pc_categoria FOREIGN KEY (category_id) REFERENCES Etiqueta(id)
);

CREATE TABLE Comentario (
    	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    	post_id INT,
    	usuario_id INT NOT NULL,
    	padre_id INT,
    	contenido TEXT NOT NULL,
    	estado BOOLEAN NOT NULL DEFAULT true,
    	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	CONSTRAINT fk_comentario_post FOREIGN KEY (post_id) REFERENCES Post(id),
    	CONSTRAINT fk_comentario_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    	CONSTRAINT fk_comentario_padre FOREIGN KEY (padre_id) REFERENCES Comentario(id)
);

CREATE TABLE Voto (
    	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    	usuario_id INT,
    	post_id INT,
    	comentario_id INT,
    	valor SMALLINT NOT NULL CHECK (valor IN (1, -1)),
    	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	CONSTRAINT fk_votos_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    	CONSTRAINT fk_votos_post FOREIGN KEY (post_id) REFERENCES Post(id),
    	CONSTRAINT fk_votos_comentario FOREIGN KEY (comentario_id) REFERENCES Comentario(id) ON DELETE CASCADE,
    	CONSTRAINT unique_voto_post UNIQUE (usuario_id, post_id),
    	CONSTRAINT unique_voto_comentario UNIQUE (usuario_id, comentario_id)
);

CREATE TYPE estado_reporte AS ENUM ('pendiente','revisada','rechazada');

CREATE TABLE Reporte (
    	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    	usuario_id INT,
    	post_id INT,
    	comentario_id INT,
    	razon TEXT NOT NULL,
    	estado estado_reporte DEFAULT 'pendiente',
    	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	CONSTRAINT fk_reporte_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    	CONSTRAINT fk_reporte_post FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE,
    	CONSTRAINT fk_reporte_comentario FOREIGN KEY (comentario_id) REFERENCES Comentario(id) ON DELETE CASCADE
);

CREATE TABLE Guardado (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    	usuario_id INTEGER NOT NULL,
    	post_id INTEGER,
    	proyecto_id INTEGER,
    	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT guardados_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
	CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES Post(id),
	CONSTRAINT fk_proyecto_id FOREIGN KEY (proyecto_id) REFERENCES Proyecto(id)
);

