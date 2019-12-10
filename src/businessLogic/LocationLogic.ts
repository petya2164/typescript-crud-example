import * as faker from "faker";

import { Location } from "../interfaces/Location";
import { EntityLogicBase } from "./EntityLogicBase";

export class LocationLogic extends EntityLogicBase<Location> {
    getCollectionName(): string {
        return "locations";
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
