import { HasId } from "../interfaces/HasId";
import { EntityStore } from "../dataAccess/EntityStore";
import { EntityStoreFactory } from "../dataAccess/EntityStoreFactory";

export abstract class EntityLogicBase<T extends HasId> {
    protected entityStore: EntityStore<T>;

    constructor() {
        this.entityStore = new EntityStoreFactory<T>().buildStore(this.getCollectionName());
    }

    abstract getCollectionName(): string;

    async getAll(): Promise<T[]> {
        return await this.entityStore.getAll();
    }

    async getById(id: number): Promise<T> {
        return await this.entityStore.getById(id);
    }

    async add(entity: T): Promise<T> {
        return await this.entityStore.add(entity);
    }

    async update(entity: T): Promise<T> {
        return await this.entityStore.update(entity);
    }

    async delete(id: number): Promise<any> {
        return await this.entityStore.delete(id);
    }

    /**
     * Special function to generate an entity with random data
     */
    abstract async generateRandom(): Promise<T>;
}
