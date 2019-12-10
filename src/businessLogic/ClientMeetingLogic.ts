import * as faker from "faker";

import { ClientMeeting } from "../interfaces/ClientMeeting";
import { EntityLogicBase } from "./EntityLogicBase";

export class ClientMeetingLogic extends EntityLogicBase<ClientMeeting> {
    getCollectionName(): string {
        return "clientMeetings";
    }

    /**
     * Special function to generate an entity with random data
     */
    async generateRandom(): Promise<ClientMeeting> {
        let clientMeeting: ClientMeeting = {
            title: faker.company.catchPhraseAdjective(),
            agenda: faker.company.bs(),
            startDate: faker.date.past().toISOString(),
            endDate: faker.date.recent().toISOString()
        };

        return clientMeeting;
    }
}
