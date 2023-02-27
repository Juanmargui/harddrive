"use strict";

const getDB = require("../../getDB");

const insertFolderQuery = async (name, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [newFolder] = await connection.query(
      `INSERT INTO folders (name, idUser) VALUES (?, ?)`,
      [name, idUser]
    );

    return newFolder.insertId; //para saber el id que la carpeta tiene en la base de datos
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFolderQuery;
