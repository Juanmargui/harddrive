"use strict";

require("dotenv").config();

const getDB = require("./getDB");

const createTables = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log("Borrando tablas...");

    await connection.query("DROP TABLE IF EXISTS files");
    await connection.query("DROP TABLE IF EXISTS folders");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("Creando tablas...");

    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,          
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS folders (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                name VARCHAR(100),     
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(idUser) REFERENCES users(id)
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS files (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) UNIQUE NOT NULL,
                idUser INT UNSIGNED NOT NULL,
                idFolder INT UNSIGNED,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY(idUser) REFERENCES users(id),
                FOREIGN KEY(idFolder) REFERENCES folders(id)
               
            )
        `);

    console.log("¡Tablas creadas!");
  } catch (err) {
    console.error(err);
  } finally {
    // Si existe una conexión la liberamos.
    if (connection) connection.release();

    // Cerramos el proceso (opcionalmente).
    process.exit();
  }
};

// Llamamos a la función anterior.
createTables();
