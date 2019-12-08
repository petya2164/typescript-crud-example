import { Contact } from "../interfaces/Contact";

export interface ContactStore {
    getContacts(): Promise<Contact[]>;

    getContact(id: number): Promise<Contact>;

    addContact(contact: Contact): Promise<Contact>;

    updateContact(contact: Contact): Promise<Contact>;

    deleteContact(id: number): Promise<any>;
}
