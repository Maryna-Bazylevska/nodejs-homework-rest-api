const { Contact } = require("../models");
const { createError } = require("../helpers");
const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    createError(404);
  }
  res.json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: {
      result,
    },
  });
};
module.exports = removeById;
