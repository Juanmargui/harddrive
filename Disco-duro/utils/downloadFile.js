"use strict";

const fs = require("fs/promises");
const path = require("path");

const selectFileByIdQuery = require("../db/queries/files/selectFileByIdQuery");
const { generateError } = require("./helpers");

const downloadFile = async (req, res, next) => {
  try {
    const { idFile } = req.params;

    const file = await selectFileByIdQuery(idFile, req.user.id);
    console.log(file);
    const filePath = path.join(__dirname, "/uploads/", file.name);

    try {
      await fs.access(filePath);
    } catch (error) {
      return;
    }

    res.download(filePath);
  } catch (e) {
    generateError("Error al descargar el fichero del servidor");
  }
};
module.exports = downloadFile;
