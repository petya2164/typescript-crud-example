import { EntityStore } from "../EntityStore";
import { LocalStorageSettings } from "./LocalStorageSettings";

interface HasId {
    id?: number;
}

export class EntityStoreLocal<T extends HasId> implements EntityStore<T> {
    storeKey: string;
    items: T[] = [];

    constructor(collectionName: string) {
        this.storeKey = LocalStorageSettings.prefix + collectionName;
        this.items = JSON.parse(localStorage.getItem(this.storeKey) || "[]");
    }

    private findMaxId() {
        let maxId = 0;
        this.items.forEach(item => {
            if (item.id !== undefined && item.id > maxId) {
                maxId = item.id;
            }
        });
        return maxId;
    }

    async getAll(): Promise<T[]> {
        // Always return a copy of the items array
        return this.items.slice();
    }

    async getById(id: number): Promise<T> {
        let entity = this.items.find(item => item.id == id);
        // Always return a copy of the item
        return <T>Object.assign({}, entity);
    }

    async add(entity: T): Promise<T> {
        if (entity.id === undefined) {
            entity.id = this.findMaxId() + 1;
        }
        this.items.push(entity);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <T>Object.assign({}, entity);
    }

    async update(entity: T): Promise<T> {
        let current = this.items.find(item => item.id == entity.id) || {};
        Object.assign(current, entity);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <T>Object.assign({}, current);
    }

    async delete(id: number): Promise<any> {
        let index = this.items.findIndex(item => item.id == id);
        if (index != -1) {
            this.items.splice(index, 1);
            localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        }

        return {};
    }
}
