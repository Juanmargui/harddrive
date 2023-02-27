"use strict";
"use strict";

const getDB = require("../../getDB");

const selectFoldersQuery = async () => {
  let connection;

  try {
    connection = await getDB();

    const [folders] = await connection.query(` SELECT * FROM folders `);

    return folders;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectFoldersQuery;
