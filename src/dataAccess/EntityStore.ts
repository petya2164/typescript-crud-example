export interface EntityStore<T> {
    getAll(): Promise<T[]>;

    getById(id: number): Promise<T>;

    add(entity: T): Promise<T>;

    update(entity: T): Promise<T>;

    delete(id: number): Promise<any>;
}
