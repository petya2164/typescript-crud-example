import axios from "axios";

import { ClientMeeting } from "../../interfaces/ClientMeeting";
import { ClientMeetingStore } from "../ClientMeetingStore";
import { RestSettings } from "./RestSettings";

export class ClientMeetingStoreRest implements ClientMeetingStore {
    baseURL: string;

    constructor() {
        this.baseURL = RestSettings.restURL;
    }

    async getClientMeetings(): Promise<ClientMeeting[]> {
        let response = await axios.get(`${this.baseURL}/clientMeetings`);
        return <ClientMeeting[]>response.data;
    }

    async getClientMeeting(id: number): Promise<ClientMeeting> {
        let response = await axios.get(`${this.baseURL}/clientMeetings/${id}`);
        return <ClientMeeting>response.data;
    }

    async addClientMeeting(clientMeeting: ClientMeeting): Promise<ClientMeeting> {
        let response = await axios.post(`${this.baseURL}/clientMeetings`, clientMeeting);
        return <ClientMeeting>response.data;
    }

    async updateClientMeeting(clientMeeting: ClientMeeting): Promise<ClientMeeting> {
        let response = await axios.patch(
            `${this.baseURL}/clientMeetings/${clientMeeting.id}`,
            clientMeeting
        );
        return <ClientMeeting>response.data;
    }

    async deleteClientMeeting(id: number): Promise<any> {
        return await axios.delete(`${this.baseURL}/clientMeetings/${id}`);
    }
}
