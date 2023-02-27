"use strict";

const { generateError } = require("../../../utils/helpers");
const getDB = require("../../getDB");

const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `
    SELECT id, password FROM users WHERE email = ?
    `,
      [email]
    );

    if (users.length < 1) {
      generateError("Ususario no encontrado", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
