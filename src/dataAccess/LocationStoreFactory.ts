import { BackendType, Settings } from "./Settings";
import { LocationStore } from "./LocationStore";
import { LocationStoreRest } from "./restApi/LocationStoreRest";
import { LocationStoreLocal } from "./localStorage/LocationStoreLocal";

/**
 * This factory builds a LocationStore object
 */
export class LocationStoreFactory {
    constructor() {}

    buildStore(): LocationStore {
        // Instantiate a backend implementation according to the currently
        // selected backend type
        switch (Settings.backend) {
            case BackendType.REST_API:
                return new LocationStoreRest();

            case BackendType.LOCAL_STORAGE:
                return new LocationStoreLocal();

            default:
                throw new Error("Invalid backend");
        }
    }
}
