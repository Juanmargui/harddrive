"use strict";

const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery");
const updateAvatarUserQuery = require("../../db/queries/users/updateAvatarUserQuery");

const { saveImg, deleteImg, generateError } = require("../../utils/helpers");

const editUserAvatar = async (req, res, next) => {
  try {
    if (!req.files?.avatar) {
      generateError("Faltan campos", 400);
    }

    const user = await selectUserByIdQuery(req.user.id);

    if (user.avatar) {
      await deleteImg(user.avatar);
    }

    const avatar = await saveImg(req.files.avatar, 200);

    await updateAvatarUserQuery(avatar, req.user.id);

    res.send({
      status: "ok",
      message: "Usuario actualizado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUserAvatar;
