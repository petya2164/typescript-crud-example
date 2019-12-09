export enum BackendType {
    LOCAL_STORAGE = "LOCAL_STORAGE",
    REST_API = "REST_API"
}

export class Settings {
    static backend: BackendType = BackendType.LOCAL_STORAGE;

    static setBackend(value: BackendType) {
        Settings.backend = value;
    }
}
