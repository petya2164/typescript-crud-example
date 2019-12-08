import axios from "axios";

import { Contact } from "../../interfaces/Contact";
import { ContactStore } from "../ContactStore";
import { RestSettings } from "./RestSettings";

export class ContactStoreRest implements ContactStore {
    baseURL: string;

    constructor() {
        this.baseURL = RestSettings.restURL;
    }

    async getContacts(): Promise<Contact[]> {
        let response = await axios.get(`${this.baseURL}/contacts`);
        return <Contact[]>response.data;
    }

    async getContact(id: number): Promise<Contact> {
        let response = await axios.get(`${this.baseURL}/contacts/${id}`);
        return <Contact>response.data;
    }

    async addContact(contact: Contact): Promise<Contact> {
        let response = await axios.post(`${this.baseURL}/contacts`, contact);
        return <Contact>response.data;
    }

    async updateContact(contact: Contact): Promise<Contact> {
        let response = await axios.patch(`${this.baseURL}/contacts/${contact.id}`, contact);
        return <Contact>response.data;
    }

    async deleteContact(id: number): Promise<any> {
        return await axios.delete(`${this.baseURL}/contacts/${id}`);
    }
}
