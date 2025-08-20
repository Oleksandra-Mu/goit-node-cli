import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "src", "db", "contacts.json");

export const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

export const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact || null;
};

export const removeContact = async (contactId) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((c) => c.id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);

  return removedContact;
};

export const addContact = async (name, email, phone) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};
