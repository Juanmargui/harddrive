"use strict";

const insertFileQuery = require("../../db/queries/files/insertFileQuery");

const { generateError, saveFile } = require("../../utils/helpers");

const newFile = async (req, res, next) => {
  try {
    const fileName = await saveFile(req.files.file);
    const idUser = req.user.id;

    if (!req.files?.file) {
      generateError("Faltan campos", 400);
    }

    await insertFileQuery(fileName, idUser);

    res.send({
      status: "ok",
      message: "Archivo agregado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFile;
