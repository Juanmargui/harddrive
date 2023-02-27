"use strict";

const { generateError } = require("../../../utils/helpers");
const getDB = require("../../getDB");

const updateUserQuery = async (name, email, idUser) => {
  let connection;

  try {
    connection = await getDB();
    if (name) {
      const [users] = await connection.query(
        `
      SELECT id FROM users WHERE name = ?
      `,
        [name]
      );
      if (users.length > 0) {
        generateError("Nombre de usuario no disponible", 403);
      }

      await connection.query(
        `
      UPDATE users SET name = ? WHERE id = ?
      `,
        [name, idUser]
      );
    }

    if (email) {
      const [users] = await connection.query(
        `
      SELECT id FROM users WHERE email = ?
      `,
        [email]
      );
      if (users.length > 0) {
        generateError("El email ya esta ocupado", 403);
      }

      await connection.query(
        `
      UPDATE users SET email = ? WHERE id = ?
      `,
        [email, idUser]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserQuery;
