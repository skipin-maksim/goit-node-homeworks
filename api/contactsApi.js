const express = require("express");
const router = express.Router();
const ContactsController = require("../controller/contactsController");

router.get("/contacts", ContactsController.get);

router.get("/contacts/:id", ContactsController.getById);

router.post("/contacts", ContactsController.create);

router.patch("/contacts/:id", ContactsController.update);

router.delete("/contacts/:id", ContactsController.remove);

module.exports = router;
