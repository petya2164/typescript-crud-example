import { BackendType, Settings } from "./Settings";
import { ClientMeetingStore } from "./ClientMeetingStore";
import { ClientMeetingStoreRest } from "./restApi/ClientMeetingStoreRest";
import { ClientMeetingStoreLocal } from "./localStorage/ClientMeetingStoreLocal";

/**
 * This factory builds a ClientMeetingStore object
 */
export class ClientMeetingStoreFactory {
    constructor() {}

    buildStore(): ClientMeetingStore {
        // Instantiate a backend implementation according to the currently
        // selected backend type
        switch (Settings.backend) {
            case BackendType.REST_API:
                return new ClientMeetingStoreRest();

            case BackendType.LOCAL_STORAGE:
                return new ClientMeetingStoreLocal();

            default:
                throw new Error("Invalid backend");
        }
    }
}
