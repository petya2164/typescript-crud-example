import { Location } from "../interfaces/Location";

export interface LocationStore {
    getLocations(): Promise<Location[]>;

    getLocation(id: number): Promise<Location>;

    addLocation(location: Location): Promise<Location>;

    updateLocation(location: Location): Promise<Location>;

    deleteLocation(id: number): Promise<any>;
}
