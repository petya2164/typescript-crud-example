export enum BackendType {
    LOCAL_STORAGE,
    REST_API
}

export class Settings {
    static backend: BackendType = BackendType.LOCAL_STORAGE;
}
