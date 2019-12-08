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
        let response = await axios.get(`${this.baseURL}/clientmeetings`);
        return <ClientMeeting[]>response.data;
    }

    async getClientMeeting(id: number): Promise<ClientMeeting> {
        let response = await axios.get(`${this.baseURL}/clientmeetings/${id}`);
        return <ClientMeeting>response.data;
    }

    async addClientMeeting(clientMeeting: ClientMeeting): Promise<ClientMeeting> {
        let response = await axios.post(`${this.baseURL}/clientmeetings`, clientMeeting);
        return <ClientMeeting>response.data;
    }

    async updateClientMeeting(clientMeeting: ClientMeeting): Promise<ClientMeeting> {
        let response = await axios.patch(
            `${this.baseURL}/clientmeetings/${clientMeeting.id}`,
            clientMeeting
        );
        return <ClientMeeting>response.data;
    }

    async deleteClientMeeting(id: number): Promise<any> {
        return await axios.delete(`${this.baseURL}/clientmeetings/${id}`);
    }
}
