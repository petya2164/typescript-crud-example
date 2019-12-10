import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { Client } from "../interfaces/Client";
import { ClientLogic } from "../businessLogic/ClientLogic";

import EntityTableBase from "./EntityTableBase";

export default class ClientTable extends EntityTableBase<Client> {
    constructor(props: RouteComponentProps) {
        super(props, new ClientLogic());
    }

    public getEntityLabel(): string {
        return "Client";
    }

    public getEntityLabelPlural(): string {
        return "Clients";
    }

    public getEditURL(): string {
        return "client_edit";
    }

    renderTableHeader(): JSX.Element {
        return (
            <React.Fragment>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Sector</th>
                <th scope="col">Actions</th>
            </React.Fragment>
        );
    }

    renderTableRow(client: Client): JSX.Element {
        return (
            <React.Fragment>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.description}</td>
                <td>{client.sector}</td>
            </React.Fragment>
        );
    }
}
