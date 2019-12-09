import { Location } from "../../interfaces/Location";
import { LocationStore } from "../LocationStore";
import { LocalStorageSettings } from "./LocalStorageSettings";

export class LocationStoreLocal implements LocationStore {
    storeKey: string;
    items: Location[] = [];

    constructor() {
        this.storeKey = LocalStorageSettings.prefix + "locations";
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

    async getLocations(): Promise<Location[]> {
        // Always return a copy of the items array
        return this.items.slice();
    }

    async getLocation(id: number): Promise<Location> {
        let location = this.items.find(item => item.id == id);
        // Always return a copy of the item
        return <Location>Object.assign({}, location);
    }

    async addLocation(location: Location): Promise<Location> {
        if (location.id === undefined) {
            location.id = this.findMaxId() + 1;
        }
        this.items.push(location);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <Location>Object.assign({}, location);
    }

    async updateLocation(location: Location): Promise<Location> {
        let current = this.items.find(item => item.id == location.id) || {};
        Object.assign(current, location);
        localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        // Always return a copy of the item
        return <Location>Object.assign({}, current);
    }

    async deleteLocation(id: number): Promise<any> {
        let index = this.items.findIndex(item => item.id == id);
        if (index != -1) {
            this.items.splice(index, 1);
            localStorage.setItem(this.storeKey, JSON.stringify(this.items));
        }

        return {};
    }
}
