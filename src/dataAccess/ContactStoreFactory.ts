import { BackendType, Settings } from "./Settings";
import { ContactStore } from "./ContactStore";
import { ContactStoreRest } from "./restApi/ContactStoreRest";
import { ContactStoreLocal } from "./localStorage/ContactStoreLocal";

/**
 * This factory builds a ContactStore object
 */
export class ContactStoreFactory {
    constructor() {}

    buildStore(): ContactStore {
        // Instantiate a backend implementation according to the currently
        // selected backend type
        switch (Settings.backend) {
            case BackendType.REST_API:
                return new ContactStoreRest();

            case BackendType.LOCAL_STORAGE:
                return new ContactStoreLocal();

            default:
                throw new Error("Invalid backend");
        }
    }
}
