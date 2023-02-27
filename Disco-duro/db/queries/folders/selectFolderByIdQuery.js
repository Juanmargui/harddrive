"use strict";

const getDB = require("../../getDB");

const { generateError } = require("../../../utils/helpers");

const selectFolderByIdQuery = async (idFolder, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [folders] = await connection.query(
      `
                SELECT F.*,
                F.idUser = ?          
                FROM folders F
                INNER JOIN users U ON U.id = F.idUser
                WHERE F.id = ?`,
      [idUser, idFolder]
    );

    // Si no existe la carpeta lanzamos un error.
    if (folders.length < 1) {
      generateError("Carpeta no encontrada", 404);
    }

    // Retornamos la carpeta
    return folders[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectFolderByIdQuery;
