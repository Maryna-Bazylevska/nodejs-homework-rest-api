const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validateRequest } = require("../../middlewares/validateRequest");
const ctrl = require("../../controllers");
const router = express.Router();
const { joiSchema, favoriteJoiSchema } = require("../../models");
router.get("/", ctrlWrapper(ctrl.getAll));
router.post("/", ctrlWrapper(ctrl.add));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.put(
  "/:id",
  validateRequest(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  validateRequest(joiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
