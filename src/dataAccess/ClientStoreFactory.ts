import { BackendType, Settings } from "./Settings";
import { ClientStore } from "./ClientStore";
import { ClientStoreRest } from "./restApi/ClientStoreRest";
import { ClientStoreLocal } from "./localStorage/ClientStoreLocal";

/**
 * This factory builds a ClientStore object
 */
export class ClientStoreFactory {
    constructor() {}

    buildStore(): ClientStore {
        // Instantiate a backend implementation according to the currently
        // selected backend type
        switch (Settings.backend) {
            case BackendType.REST_API:
                return new ClientStoreRest();

            case BackendType.LOCAL_STORAGE:
                return new ClientStoreLocal();

            default:
                throw new Error("Invalid backend");
        }
    }
}
