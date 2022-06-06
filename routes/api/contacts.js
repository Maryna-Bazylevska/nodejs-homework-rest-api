const express = require("express");
const contactsOperations = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      const error = new Error(`Contacts with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "sucess",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { name, email, phone } = req.body;
    const result = await contactsOperations.addContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      const error = new Error(`Contacts with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "succsess",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error(`Contacts with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact updated",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
