"use strict";

const deleteFolderQuery = require("../../db/queries/folders/deleteFolderQuery");
const selectFolderByIdQuery = require("../../db/queries/folders/selectFolderByIdQuery");
const { generateError } = require("../../utils/helpers");

const deleteFolder = async (req, res, next) => {
  try {
    const { idFolder, idUser } = req.params;

    const folder = await selectFolderByIdQuery(idFolder, req.user.id);

    if (!folder) {
      generateError("No se encontro el archivo");
    }

    await deleteFolderQuery(idFolder, idUser);

    res.send({
      status: "ok",
      message: "Carpeta eliminada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteFolder;
