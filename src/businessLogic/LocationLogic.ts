import * as faker from "faker";

import { Location } from "../interfaces/Location";
import { EntityStoreFactory } from "../dataAccess/EntityStoreFactory";
import { EntityLogicBase } from "./EntityLogicBase";

export class LocationLogic extends EntityLogicBase<Location> {
    constructor() {
        super();
        this.entityStore = new EntityStoreFactory<Location>().buildStore("locations");
    }

    /**
     * Special function to generate an entity with random data
     */
    async generateRandom(): Promise<Location> {
        let location: Location = {
            name: faker.company.catchPhraseAdjective(),
            description: faker.company.catchPhrase(),
            address: faker.address.streetAddress()
        };

        return location;
    }
}
