const contactOperations = require("./contacts.js");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await contactOperations.listContacts();
        console.table(contacts);
        break;
      case "get":
        const searchedContact = await contactOperations.getContactById(id);
        if (!searchedContact) {
          throw new Error(`Contact with id: ${id} not found`);
        }
        console.log(searchedContact);
        break;
      case "add":
        const newContact = await contactOperations.addContact(
          name,
          email,
          phone
        );
        console.log(newContact);
        
        break;
      case "remove":
        const removedContact = await contactOperations.removeContact(id);
        if (!removedContact) {
          throw new Error(`Contact with id: ${id} not found`);
        }
        console.log(removedContact);
        
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error);
  }
};

invokeAction(argv);
