"use strict";

const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");
const generateError = (msg, status) => {
  const err = new Error(msg);
  err.httpStatus = status;
  throw err;
};

const saveImg = async (img) => {
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  const sharpImg = sharp(img.data);

  sharpImg.resize(100);

  const imgName = `${uuid()}.jpg`;

  const imgPath = path.join(uploadsPath, imgName);

  await sharpImg.toFile(imgPath);

  return imgName;
};

const deleteImg = async (imgName) => {
  try {
    const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);

    try {
      await fs.access(imgPath);
    } catch (error) {
      return;
    }

    await fs.unlink(imgPath);
  } catch {
    generateError("Error al eliminar la imagen del servidor");
  }
};

const saveFile = async (file) => {
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  const fileName =
    `${uuid()}` +
    `${file.name.substring(file.name.lastIndexOf(".")).toLowerCase()}`;

  const filePath = path.join(uploadsPath, fileName);

  await fs.writeFile(filePath, file.data, "utf-8");

  return fileName;
};

const readFile = async (fileName) => {
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);
  const file = await fs.readFile(path.join(uploadsPath, fileName));
  return file;
};

const deleteArchive = async (fileName) => {
  try {
    const filePath = path.join(__dirname, process.env.UPLOADS_DIR, fileName);

    try {
      await fs.access(filePath);
    } catch (error) {
      return;
    }

    await fs.unlink(filePath, fileName);
  } catch {
    generateError("Error al eliminar la imagen del servidor");
  }
};

module.exports = {
  generateError,
  saveImg,
  deleteImg,
  saveFile,
  deleteArchive,
  readFile,
};
