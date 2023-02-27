"use strict";

const getDB = require("../../getDB");

const { generateError, deleteArchive } = require("../../../utils/helpers");

const deleteFileQuery = async (idFile, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [fileName] = await connection.query(
      `
    SELECT name FROM files WHERE id = ? AND idUser = ?
    `,
      [idFile, idUser]
    );

    if (fileName.length < 1) {
      generateError("Archivo no encontrado", 404);
    }

    if (fileName) {
      await deleteArchive(fileName[0].name);
    }

    await connection.query(
      `
    DELETE FROM files WHERE id = ? 
    `,
      [idFile]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteFileQuery;
