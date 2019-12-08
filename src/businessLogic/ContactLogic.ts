import * as faker from "faker";

import { Contact } from "../interfaces/Contact";
import { ContactStore } from "../dataAccess/ContactStore";
import { ContactStoreFactory } from "../dataAccess/ContactStoreFactory";

export class ContactLogic {
    contactStore: ContactStore;

    constructor() {
        this.contactStore = new ContactStoreFactory().buildStore();
    }

    async getContacts(): Promise<Contact[]> {
        return this.contactStore.getContacts();
    }

    async getContact(id: number): Promise<Contact> {
        return this.contactStore.getContact(id);
    }

    async addContact(contact: Contact): Promise<Contact> {
        return this.contactStore.addContact(contact);
    }

    async updateContact(contact: Contact): Promise<Contact> {
        return this.contactStore.updateContact(contact);
    }

    async deleteContact(id: number): Promise<any> {
        return this.contactStore.deleteContact(id);
    }

    async generateRandomContact(): Promise<Contact> {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();

        let contact: Contact = {
            firstName: firstName,
            lastName: lastName,
            role: faker.name.jobType(),
            email: faker.internet.email(firstName, lastName),
            phone: faker.phone.phoneNumber("###-####")
        };

        return contact;
    }
}
