import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { Location } from "../interfaces/Location";
import { LocationLogic } from "../businessLogic/LocationLogic";

import EntityTableBase from "./EntityTableBase";

export default class LocationTable extends EntityTableBase<Location> {
    constructor(props: RouteComponentProps) {
        super(props, new LocationLogic());
    }

    public render() {
        const locations = this.state.entities;
        return (
            <div className="container">
                <br />
                <div className="text-center">
                    <h2>Locations</h2>
                </div>

                <div className="btn-toolbar">
                    <Link to={`location_edit`} className="btn btn-success mr-2">
                        Create New Location
                    </Link>
                    <button className="btn btn-primary" onClick={() => this.generateEntity()}>
                        Generate Random Location
                    </button>
                </div>

                {locations.length === 0 && (
                    <div className="text-center">
                        <h3>No location found at the moment</h3>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locations &&
                                    locations.map(location => (
                                        <tr key={location.id}>
                                            <td>{location.id}</td>
                                            <td>{location.name}</td>
                                            <td>{location.description}</td>
                                            <td>{location.address}</td>

                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-toolbar">
                                                        <Link
                                                            to={`location_edit/${location.id}`}
                                                            className="btn btn-sm btn-outline-secondary mr-1"
                                                        >
                                                            Edit Location
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() =>
                                                                this.deleteEntity(location.id!)
                                                            }
                                                        >
                                                            Delete Location
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
