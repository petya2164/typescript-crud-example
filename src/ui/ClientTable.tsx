import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { Client } from "../interfaces/Client";
import { ClientLogic } from "../businessLogic/ClientLogic";

import EntityTableBase from "./EntityTableBase";

export default class ClientTable extends EntityTableBase<Client> {
    constructor(props: RouteComponentProps) {
        super(props, new ClientLogic());
    }

    public render() {
        const clients = this.state.entities;
        return (
            <div className="container">
                <br />
                <div className="text-center">
                    <h2>Clients</h2>
                </div>

                <div className="btn-toolbar">
                    <Link to={`client_edit`} className="btn btn-success mr-2">
                        Create New Client
                    </Link>
                    <button className="btn btn-primary" onClick={() => this.generateEntity()}>
                        Generate Random Client
                    </button>
                </div>

                {clients.length === 0 && (
                    <div className="text-center">
                        <h3>No client found at the moment</h3>
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
                                    <th scope="col">Sector</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients &&
                                    clients.map(client => (
                                        <tr key={client.id}>
                                            <td>{client.id}</td>
                                            <td>{client.name}</td>
                                            <td>{client.description}</td>
                                            <td>{client.sector}</td>

                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-toolbar">
                                                        <Link
                                                            to={`client_edit/${client.id}`}
                                                            className="btn btn-sm btn-outline-secondary mr-1"
                                                        >
                                                            Edit Client
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() =>
                                                                this.deleteEntity(client.id!)
                                                            }
                                                        >
                                                            Delete Client
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
