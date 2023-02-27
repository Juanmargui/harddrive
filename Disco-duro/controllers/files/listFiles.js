"use strict";

const selectFilesQuery = require("../../db/queries/files/selectFilesQuery");

const listFiles = async (req, res, next) => {
  try {
    const file = await selectFilesQuery(req.user.id);

    res.send({
      status: "ok",
      data: {
        file,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listFiles;
