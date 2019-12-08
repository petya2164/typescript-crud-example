import { Client } from "../interfaces/Client";

export interface ClientStore {
    getClients(): Promise<Client[]>;

    getClient(id: number): Promise<Client>;

    addClient(client: Client): Promise<Client>;

    updateClient(client: Client): Promise<Client>;

    deleteClient(id: number): Promise<any>;
}
