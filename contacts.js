const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = "./db/contacts.json";

const listContacts = async () => {
  const responseData = await fs.readFile(contactsPath, "utf-8");

  console.table(JSON.parse(responseData));
};

const getContactById = async (contactId) => {
  const responseData = await fs.readFile(contactsPath, "utf-8");

  const foundContact = JSON.parse(responseData).find(
    (contact) => contact.id === contactId
  );

  console.log(foundContact);
};

const removeContact = async (contactId) => {
  const response = await fs.readFile(contactsPath, "utf-8");

  const removeContact = JSON.parse(response).filter(
    (contact) => contact.id === contactId
  );

  const remainingСontacts = JSON.parse(response).filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(remainingСontacts), (err) => {
    if (err) throw err;
  });

  console.log("Удалили - ", removeContact);
  console.log("Остались - ", remainingСontacts);
};

const addContact = async (name, email, phone) => {
  const response = await fs.readFile(contactsPath, "utf-8");
  const responseData = JSON.parse(response);

  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  responseData.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(responseData), (err) => {
    if (err) throw err;
  });

  console.log("Контакт -", newContact, " добавлен");
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
