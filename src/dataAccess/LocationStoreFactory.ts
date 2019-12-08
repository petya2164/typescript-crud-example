import { BackendType, Settings } from "./Settings";
import { LocationStore } from "./LocationStore";
import { LocationStoreRest } from "./restApi/LocationStoreRest";

export class LocationStoreFactory {
    constructor() {}

    buildStore(): LocationStore {
        // Instantiate a backend implementation according to the currently
        // selected backend type
        switch (Settings.backend) {
            case BackendType.REST_API:
                return new LocationStoreRest();

            case BackendType.LOCAL_STORAGE:
                throw new Error("Invalid backend");
            //return new LocationStoreLocal();

            default:
                throw new Error("Invalid backend");
        }
    }
}
