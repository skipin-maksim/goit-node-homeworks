const express = require("express");
const controllerContacts = require("../../controllers/contacts");
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require("../../validation/contacts");
router
  .get("/", controllerContacts.getAll)
  .get("/:id", controllerContacts.getById)
  .post("/", validateCreateContact, controllerContacts.create)
  .put("/:id", validateUpdateContact, controllerContacts.update)
  .patch(
    "/:id/vaccinated",
    validateUpdateStatusContact,
    controllerContacts.updateStatus
  )
  .delete("/:id", controllerContacts.remove);

module.exports = router;
