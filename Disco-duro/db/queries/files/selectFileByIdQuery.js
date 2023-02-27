"use strict";

const { generateError } = require("../../../utils/helpers");
const getDB = require("../../getDB");

const selectFileByIdQuery = async (idFile, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [files] = await connection.query(
      `
      SELECT * FROM files WHERE id = ? AND idUser = ?
      `,
      [idFile, idUser]
    );

    if (files.length < 1) {
      generateError("Fichero no encontrado", 404);
    }

    return files[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectFileByIdQuery;
