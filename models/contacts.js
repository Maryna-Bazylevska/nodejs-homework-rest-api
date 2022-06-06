// const fs = require('fs/promises')

const fs = require("fs/promises");
const path = require("path");
const pathContacts = path.join(__dirname, "contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(pathContacts);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const addContacts = await listContacts();
  const index = addContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = addContacts.splice(index, 1);
  await fs.writeFile(pathContacts, JSON.stringify(addContacts));
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const addContacts = await listContacts();
  const newContact = { contactId: v4(), name, email, phone };
  addContacts.push(newContact, JSON.stringify(addContact));
  return newContact;
};

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...data, contactId };
  await fs.writeFile(pathContacts, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
