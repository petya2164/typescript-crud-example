import axios from "axios";

import { EntityStore } from "../EntityStore";
import { RestSettings } from "./RestSettings";

interface HasId {
    id?: number;
}

export class EntityStoreRest<T extends HasId> implements EntityStore<T> {
    endpoint: string;

    constructor(collectionName: string) {
        this.endpoint = `${RestSettings.restURL}/${collectionName}`;
    }

    async getAll(): Promise<T[]> {
        let response = await axios.get(`${this.endpoint}`);
        return <T[]>response.data;
    }

    async getById(id: number): Promise<T> {
        let response = await axios.get(`${this.endpoint}/${id}`);
        return <T>response.data;
    }

    async add(entity: T): Promise<T> {
        let response = await axios.post(`${this.endpoint}`, entity);
        return <T>response.data;
    }

    async update(entity: T): Promise<T> {
        let response = await axios.patch(`${this.endpoint}/${entity.id}`, entity);
        return <T>response.data;
    }

    async delete(id: number): Promise<any> {
        return await axios.delete(`${this.endpoint}/${id}`);
    }
}
