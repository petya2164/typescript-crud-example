import { Contact } from "../../interfaces/Contact";
import { ContactStore } from "../ContactStore";
import { LocalStorageSettings } from "./LocalStorageSettings";

export class ContactStoreLocal implements ContactStore {
    storeKey: string;
    items: Contact[] = [];

    constructor() {
        this.storeKey = LocalStorageSettings.prefix + "contacts";
        this.items = JSON.parse(localStorage.getItem(this.storeKey) || "[]");
    }

    private findMaxId() {
        let maxId = 0;
        this.items.forEach(item => {
            if (item.id !== undefined && item.id > maxId) {
                maxId = item.id;
            }
        });
        return maxId;
    }

    async getContacts(): Promise<Contact[]> {
        // Always return a copy of the items array
        return this.items.slice();
    }

    async getContact(id: number): Promise<Contact> {
        let contact = this.items.find(item => item.id == id);
        // Always return a copy of the item
        return <Contact>Object.assign({}, contact);
    }

    async addContact(contact: Contact): Promise<Contact> {
        if (contact.id === undefined) {
            contact.id = this.findMaxId() + 1;
        }
        this.items.push(contact);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <Contact>Object.assign({}, contact);
    }

    async updateContact(contact: Contact): Promise<Contact> {
        let current = this.items.find(item => item.id == contact.id) || {};
        Object.assign(current, contact);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <Contact>Object.assign({}, current);
    }

    async deleteContact(id: number): Promise<any> {
        let index = this.items.findIndex(item => item.id == id);
        if (index != -1) {
            this.items.splice(index, 1);
            localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        }

        return {};
    }
}
