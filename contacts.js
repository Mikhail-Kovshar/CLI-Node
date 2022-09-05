const fs = require("fs").promises;
const { v4 } = require("uuid");
const updateContacts = require("./updateContacts");
const contactsPath = require("./contactsPath");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const searchedContact = contacts.find(
      (item) => item.id === contactId.toString()
    );
    if (!searchedContact) {
      return null;
    }
    return searchedContact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId.toString());
    if (idx === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    console.table(contacts);
    return removedContact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: v4(), name, email, phone };
    const contacts = await listContacts();

    contacts.push(newContact);
    updateContacts(contacts);
    console.table(contacts);
    return newContact;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
