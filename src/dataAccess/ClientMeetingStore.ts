import { ClientMeeting } from "../interfaces/ClientMeeting";

export interface ClientMeetingStore {
    getClientMeetings(): Promise<ClientMeeting[]>;

    getClientMeeting(id: number): Promise<ClientMeeting>;

    addClientMeeting(clientMeeting: ClientMeeting): Promise<ClientMeeting>;

    updateClientMeeting(clientMeeting: ClientMeeting): Promise<ClientMeeting>;

    deleteClientMeeting(id: number): Promise<any>;
}
