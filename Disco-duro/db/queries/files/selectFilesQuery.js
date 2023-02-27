"use strict";

const getDB = require("../../getDB");

const selectFilesQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [files] = await connection.query(
      `
    SELECT F.*, U.name AS user
    FROM files F
    INNER JOIN users U ON U.id = F.idUser
    WHERE idUser = ?
    `,
      [idUser]
    );

    return files;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectFilesQuery;
