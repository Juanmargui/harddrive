"use strict";

const deleteFileQuery = require("../../db/queries/files/deleteFileQuery");
const selectFileByIdQuery = require("../../db/queries/files/selectFileByIdQuery");
const { generateError } = require("../../utils/helpers");

const deleteFile = async (req, res, next) => {
  try {
    const { idFile, idUser } = req.params;

    const file = await selectFileByIdQuery(idFile, req.user.id);

    if (!file) {
      generateError("No se encontro el archivo");
    }

    await deleteFileQuery(idFile, idUser);

    res.send({
      status: "ok",
      message: "archivo eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteFile;
