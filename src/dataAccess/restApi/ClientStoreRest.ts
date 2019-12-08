import axios from "axios";

import { Client } from "../../interfaces/Client";
import { ClientStore } from "../ClientStore";
import { RestSettings } from "./RestSettings";

export class ClientStoreRest implements ClientStore {
    baseURL: string;

    constructor() {
        this.baseURL = RestSettings.restURL;
    }

    async getClients(): Promise<Client[]> {
        let response = await axios.get(`${this.baseURL}/clients`);
        return <Client[]>response.data;
    }

    async getClient(id: number): Promise<Client> {
        let response = await axios.get(`${this.baseURL}/clients/${id}`);
        return <Client>response.data;
    }

    async addClient(client: Client): Promise<Client> {
        let response = await axios.post(`${this.baseURL}/clients`, client);
        return <Client>response.data;
    }

    async updateClient(client: Client): Promise<Client> {
        let response = await axios.patch(`${this.baseURL}/clients/${client.id}`, client);
        return <Client>response.data;
    }

    async deleteClient(id: number): Promise<any> {
        return await axios.delete(`${this.baseURL}/clients/${id}`);
    }
}
