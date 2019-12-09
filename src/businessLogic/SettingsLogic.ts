import { BackendType, Settings } from "../dataAccess/Settings";

export class SettingsLogic {
    static currentBackend(): string {
        return Settings.backend;
    }

    static changeBackend(): string {
        // Switch to the next backend
        switch (Settings.backend) {
            case BackendType.REST_API:
                Settings.setBackend(BackendType.LOCAL_STORAGE);
                break;

            case BackendType.LOCAL_STORAGE:
                Settings.setBackend(BackendType.REST_API);
                break;

            default:
                throw new Error("Invalid backend");
        }
        return Settings.backend;
    }
}
