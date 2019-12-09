import * as faker from "faker";

import { ClientMeeting } from "../interfaces/ClientMeeting";
import { EntityStoreFactory } from "../dataAccess/EntityStoreFactory";
import { EntityLogicBase } from "./EntityLogicBase";

export class ClientMeetingLogic extends EntityLogicBase<ClientMeeting> {
    constructor() {
        super();
        this.entityStore = new EntityStoreFactory<ClientMeeting>().buildStore("clientMeetings");
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
