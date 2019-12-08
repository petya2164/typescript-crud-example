import axios from "axios";

import { Location } from "../../interfaces/Location";
import { LocationStore } from "../LocationStore";
import { RestSettings } from "./RestSettings";

export class LocationStoreRest implements LocationStore {
    baseURL: string;

    constructor() {
        this.baseURL = RestSettings.restURL;
    }

    async getLocations(): Promise<Location[]> {
        let response = await axios.get(`${this.baseURL}/locations`);
        return <Location[]>response.data;
    }

    async getLocation(id: number): Promise<Location> {
        let response = await axios.get(`${this.baseURL}/locations/${id}`);
        return <Location>response.data;
    }

    async addLocation(location: Location): Promise<Location> {
        let response = await axios.post(`${this.baseURL}/locations`, location);
        return <Location>response.data;
    }

    async updateLocation(location: Location): Promise<Location> {
        let response = await axios.patch(`${this.baseURL}/locations/${location.id}`, location);
        return <Location>response.data;
    }

    async deleteLocation(id: number): Promise<any> {
        return await axios.delete(`${this.baseURL}/locations/${id}`);
    }
}
