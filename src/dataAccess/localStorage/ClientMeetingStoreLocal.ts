import { ClientMeeting } from "../../interfaces/ClientMeeting";
import { ClientMeetingStore } from "../ClientMeetingStore";
import { LocalStorageSettings } from "./LocalStorageSettings";

export class ClientMeetingStoreLocal implements ClientMeetingStore {
    storeKey: string;
    items: ClientMeeting[] = [];

    constructor() {
        this.storeKey = LocalStorageSettings.prefix + "client_meetings";
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

    async getClientMeetings(): Promise<ClientMeeting[]> {
        // Always return a copy of the items array
        return this.items.slice();
    }

    async getClientMeeting(id: number): Promise<ClientMeeting> {
        let clientMeeting = this.items.find(item => item.id == id);
        // Always return a copy of the item
        return <ClientMeeting>Object.assign({}, clientMeeting);
    }

    async addClientMeeting(clientMeeting: ClientMeeting): Promise<ClientMeeting> {
        if (clientMeeting.id === undefined) {
            clientMeeting.id = this.findMaxId() + 1;
        }
        this.items.push(clientMeeting);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <ClientMeeting>Object.assign({}, clientMeeting);
    }

    async updateClientMeeting(clientMeeting: ClientMeeting): Promise<ClientMeeting> {
        let current = this.items.find(item => item.id == clientMeeting.id) || {};
        Object.assign(current, clientMeeting);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <ClientMeeting>Object.assign({}, current);
    }

    async deleteClientMeeting(id: number): Promise<any> {
        let index = this.items.findIndex(item => item.id == id);
        if (index != -1) {
            this.items.splice(index, 1);
            localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        }

        return {};
    }
}
