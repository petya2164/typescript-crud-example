import { Contact } from "../interfaces/Contact";

export interface ContactStore {
    getContacts(): Promise<Contact[]>;

    getContact(id: number): Promise<Contact>;

    addContact(Contact: Contact): Promise<Contact>;

    updateContact(Contact: Contact): Promise<Contact>;

    deleteContact(id: number): Promise<any>;
}
