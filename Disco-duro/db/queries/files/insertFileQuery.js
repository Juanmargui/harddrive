"use strict";

const getDB = require("../../getDB");

const insertFileQuery = async (name, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [file] = await connection.query(
      ` 
      INSERT INTO files (name, idUser) VALUES (?, ?) `,
      [name, idUser]
    );

    return {
      id: file.insertId,
      name,
      idUser,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFileQuery;
