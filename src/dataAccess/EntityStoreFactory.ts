import { BackendType, Settings } from "./Settings";
import { EntityStore } from "./EntityStore";
import { EntityStoreRest } from "./restApi/EntityStoreRest";
import { EntityStoreLocal } from "./localStorage/EntityStoreLocal";

/**
 * This generic factory builds an EntityStore object
 */
export class EntityStoreFactory<T> {
    constructor() {}

    buildStore(collectionName: string): EntityStore<T> {
        // Instantiate a backend implementation according to the currently
        // selected backend type
        switch (Settings.backend) {
            case BackendType.REST_API:
                return new EntityStoreRest<T>(collectionName);

            case BackendType.LOCAL_STORAGE:
                return new EntityStoreLocal<T>(collectionName);

            default:
                throw new Error("Invalid backend");
        }
    }
}
