"use strict";

const getDB = require("../../getDB");

const { generateError } = require("../../../utils/helpers");

const selectUserByIdQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id, name, email, avatar, createdAt FROM users WHERE id = ?`,
      [idUser]
    );

    if (users.length < 1) {
      generateError("Usuario no encontrado", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
