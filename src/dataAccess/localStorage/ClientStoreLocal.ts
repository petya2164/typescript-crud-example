import { Client } from "../../interfaces/Client";
import { ClientStore } from "../ClientStore";
import { LocalStorageSettings } from "./LocalStorageSettings";

export class ClientStoreLocal implements ClientStore {
    storeKey: string;
    items: Client[] = [];

    constructor() {
        this.storeKey = LocalStorageSettings.prefix + "clients";
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

    async getClients(): Promise<Client[]> {
        // Always return a copy of the items array
        return this.items.slice();
    }

    async getClient(id: number): Promise<Client> {
        let client = this.items.find(item => item.id == id);
        // Always return a copy of the item
        return <Client>Object.assign({}, client);
    }

    async addClient(client: Client): Promise<Client> {
        if (client.id === undefined) {
            client.id = this.findMaxId() + 1;
        }
        this.items.push(client);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <Client>Object.assign({}, client);
    }

    async updateClient(client: Client): Promise<Client> {
        let current = this.items.find(item => item.id == client.id) || {};
        Object.assign(current, client);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <Client>Object.assign({}, current);
    }

    async deleteClient(id: number): Promise<any> {
        let index = this.items.findIndex(item => item.id == id);
        if (index != -1) {
            this.items.splice(index, 1);
            localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        }

        return {};
    }
}
