import * as faker from "faker";

import { ClientMeeting } from "../interfaces/ClientMeeting";
import { ClientMeetingStore } from "../dataAccess/ClientMeetingStore";
import { ClientMeetingStoreFactory } from "../dataAccess/ClientMeetingStoreFactory";

export class ClientMeetingLogic {
    clientMeetingStore: ClientMeetingStore;

    constructor() {
        this.clientMeetingStore = new ClientMeetingStoreFactory().buildStore();
    }

    async getClientMeetings(): Promise<ClientMeeting[]> {
        return this.clientMeetingStore.getClientMeetings();
    }

    async getClientMeeting(id: number): Promise<ClientMeeting> {
        return this.clientMeetingStore.getClientMeeting(id);
    }

    async addClientMeeting(clientmeeting: ClientMeeting): Promise<ClientMeeting> {
        return this.clientMeetingStore.addClientMeeting(clientmeeting);
    }

    async updateClientMeeting(clientmeeting: ClientMeeting): Promise<ClientMeeting> {
        return this.clientMeetingStore.updateClientMeeting(clientmeeting);
    }

    async deleteClientMeeting(id: number): Promise<any> {
        return this.clientMeetingStore.deleteClientMeeting(id);
    }

    /**
     * Special function to generate an entity with random data
     */
    async generateRandomClientMeeting(): Promise<ClientMeeting> {
        let clientmeeting: ClientMeeting = {
            title: faker.company.catchPhraseAdjective(),
            agenda: faker.company.bs(),
            startDate: faker.date.past().toISOString(),
            endDate: faker.date.recent().toISOString()
        };

        return clientmeeting;
    }
}
