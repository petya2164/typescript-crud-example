import * as faker from "faker";

import { Location } from "../interfaces/Location";
import { LocationStore } from "../dataAccess/LocationStore";
import { LocationStoreFactory } from "../dataAccess/LocationStoreFactory";

export class LocationLogic {
    locationStore: LocationStore;

    constructor() {
        this.locationStore = new LocationStoreFactory().buildStore();
    }

    async getLocations(): Promise<Location[]> {
        return this.locationStore.getLocations();
    }

    async getLocation(id: number): Promise<Location> {
        return this.locationStore.getLocation(id);
    }

    async addLocation(location: Location): Promise<Location> {
        return this.locationStore.addLocation(location);
    }

    async updateLocation(location: Location): Promise<Location> {
        return this.locationStore.updateLocation(location);
    }

    async deleteLocation(id: number): Promise<any> {
        return this.locationStore.deleteLocation(id);
    }

    /**
     * Special function to generate an entity with random data
     */
    async generateRandomLocation(): Promise<Location> {
        let location: Location = {
            name: faker.company.catchPhraseAdjective(),
            description: faker.company.catchPhrase(),
            address: faker.address.streetAddress()
        };

        return location;
    }
}
