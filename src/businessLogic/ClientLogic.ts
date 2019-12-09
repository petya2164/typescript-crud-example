import * as faker from "faker";

import { Client } from "../interfaces/Client";
import { EntityStoreFactory } from "../dataAccess/EntityStoreFactory";
import { EntityLogicBase } from "./EntityLogicBase";

export class ClientLogic extends EntityLogicBase<Client> {
    constructor() {
        super();
        this.entityStore = new EntityStoreFactory<Client>().buildStore("clients");
    }

    /**
     * Special function to generate an entity with random data
     */
    async generateRandom(): Promise<Client> {
        let client: Client = {
            name: faker.company.companyName(),
            description: faker.company.catchPhrase(),
            sector: faker.commerce.department()
        };

        return client;
    }
}
