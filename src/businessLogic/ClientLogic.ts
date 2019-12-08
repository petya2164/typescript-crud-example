import * as faker from "faker";

import { Client } from "../interfaces/Client";
import { ClientStore } from "../dataAccess/ClientStore";
import { ClientStoreFactory } from "../dataAccess/ClientStoreFactory";

export class ClientLogic {
    clientStore: ClientStore;

    constructor() {
        this.clientStore = new ClientStoreFactory().buildStore();
    }

    async getClients(): Promise<Client[]> {
        return this.clientStore.getClients();
    }

    async getClient(id: number): Promise<Client> {
        return this.clientStore.getClient(id);
    }

    async addClient(client: Client): Promise<Client> {
        return this.clientStore.addClient(client);
    }

    async updateClient(client: Client): Promise<Client> {
        return this.clientStore.updateClient(client);
    }

    async deleteClient(id: number): Promise<any> {
        return this.clientStore.deleteClient(id);
    }

    /**
     * Special function to generate an entity with random data
     */
    async generateRandomClient(): Promise<Client> {
        let client: Client = {
            name: faker.company.companyName(),
            description: faker.company.catchPhrase(),
            sector: faker.commerce.department()
        };

        return client;
    }
}
