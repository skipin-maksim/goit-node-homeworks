const path = require("path");
const fs = require("fs").promises;
// const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "../db/contacts.json");
const defaultContactsPath = path.join(__dirname, "../db/defaultContacts.json");

async function listContacts() {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const response = await fs.readFile(contactsPath, "utf-8");
    const foundContact = JSON.parse(response).find((el) => el.id === contactId);
    return foundContact;
  } catch (err) {
    console.log(err.message);
  }
};

async function editContact(contactId, obj) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const foundContact = data.find((el) => el.id === contactId);
  const updateData = data.filter((el) => el.id !== contactId);
  try {
    const updateContact = { ...foundContact, ...obj };

    await fs.writeFile(
      contactsPath,
      JSON.stringify([...updateData, updateContact], null, 2)
    );
    if (foundContact) {
      return updateContact;
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath, "utf-8");
    const foundContacts = JSON.parse(response).filter(
      (el) => el.id !== contactId
    );

    if (foundContacts.length !== JSON.parse(response).length) {
      await fs.writeFile(contactsPath, JSON.stringify(foundContacts, null, 2));
      return "ok";
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(obj) {
  const contactsData = JSON.parse(await fs.readFileSync(contactsPath, "utf8"));
  const id = Math.max(...contactsData.map((el) => el.id)) + 1;
  contactsData.push({ id, ...obj });

  const writeNewContact = await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsData, null, 2)
  );
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data).find((el) => el.id === id);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
};
