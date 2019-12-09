import { EntityStore } from "../dataAccess/EntityStore";

export abstract class EntityLogicBase<T> {
    protected entityStore!: EntityStore<T>;

    constructor() {}

    async getAll(): Promise<T[]> {
        return this.entityStore.getAll();
    }

    async getById(id: number): Promise<T> {
        return this.entityStore.getById(id);
    }

    async add(entity: T): Promise<T> {
        return this.entityStore.add(entity);
    }

    async update(entity: T): Promise<T> {
        return this.entityStore.update(entity);
    }

    async delete(id: number): Promise<any> {
        return this.entityStore.delete(id);
    }

    /**
     * Special function to generate an entity with random data
     */
    abstract async generateRandom(): Promise<T>;
}
