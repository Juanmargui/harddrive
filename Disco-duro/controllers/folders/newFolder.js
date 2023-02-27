"use strict";

const { generateError, saveFile } = require("../../utils/helpers");
const insertFolderQuery = require("../../db/queries/folders/insertFolderQuery");

const newFolder = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      generateError("Faltan campos", 400);
    }

    await insertFolderQuery(name, req.user.id);

    let files = [];

    if (req.files) {
      for (const file of Object.values(req.files).slice(0, 3)) {
        const fileName = await saveFile(file);

        files.push(fileName);
      }
    }

    res.send({
      status: "Ok",
      data: {
        files,
        idUser: req.user.id,
        createdAt: new Date(),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFolder;
