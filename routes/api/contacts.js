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
// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsOperations.getContactById(contactId);
//     if (!result) {
//       const error = new Error(`Contacts with id=${contactId} not found`);
//       error.status = 404;
//       throw error;
//     }
//     res.json({
//       status: "sucess",
//       code: 200,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = joiSchema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       throw error;
//     }
//     const { name, email, phone } = req.body;
//     const result = await contactsOperations.addContact(name, email, phone);
//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsOperations.removeContact(contactId);
//     if (!result) {
//       const error = new Error(`Contacts with id=${contactId} not found`);
//       error.status = 404;
//       throw error;
//     }
//     res.json({
//       status: "succsess",
//       code: 200,
//       message: "contact deleted",
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = joiSchema.validate(req.body);

//     if (error) {
//       error.status = 400;
//       throw error;
//     }
//     const { contactId } = req.params;
//     const result = await contactsOperations.updateContact(contactId, req.body);
//     if (!result) {
//       const error = new Error(`Contacts with id=${contactId} not found`);
//       error.status = 404;
//       throw error;
//     }
//     res.json({
//       status: "success",
//       code: 200,
//       message: "contact updated",
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
