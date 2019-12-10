import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { Location } from "../interfaces/Location";
import { LocationLogic } from "../businessLogic/LocationLogic";

import EntityTableBase from "./EntityTableBase";

export default class LocationTable extends EntityTableBase<Location> {
    constructor(props: RouteComponentProps) {
        super(props, new LocationLogic());
    }

    public getEntityLabel(): string {
        return "Location";
    }

    public getEntityLabelPlural(): string {
        return "Locations";
    }

    public getEditURL(): string {
        return "location_edit";
    }

    renderTableHeader(): JSX.Element {
        return (
            <React.Fragment>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Address</th>
                <th scope="col">Actions</th>
            </React.Fragment>
        );
    }

    renderTableRow(location: Location): JSX.Element {
        return (
            <React.Fragment>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.description}</td>
                <td>{location.address}</td>
            </React.Fragment>
        );
    }
}
