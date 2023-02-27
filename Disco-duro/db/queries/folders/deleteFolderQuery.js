"use strict";

const getDB = require("../../getDB");

const { generateError, deleteArchive } = require("../../../utils/helpers");

const deleteFolderQuery = async (idFolder, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [folderName] = await connection.query(
      `
    SELECT name FROM folders WHERE id = ? AND idUser = ?
    `,
      [idFolder, idUser]
    );

    if (folderName.length < 1) {
      generateError("Archivo no encontrado", 404);
    }

    if (folderName) {
      await deleteArchive(folderName[0].name);
    }

    await connection.query(
      `
    DELETE FROM folders WHERE id = ? 
    `,
      [idFolder]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteFolderQuery;
