import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { Client } from "../interfaces/Client";
import { ClientLogic } from "../businessLogic/ClientLogic";

interface IState {
    clients: Client[];
}

export default class ClientTable extends React.Component<RouteComponentProps, IState> {
    clientLogic: ClientLogic;

    constructor(props: RouteComponentProps) {
        super(props);
        this.clientLogic = new ClientLogic();
        this.state = { clients: [] };
    }

    public componentDidMount(): void {
        this.clientLogic.getClients().then(data => {
            this.setState({ clients: data });
        });
    }

    public deleteClient(id: number) {
        this.clientLogic.deleteClient(id).then(() => {
            const index = this.state.clients.findIndex(client => client.id === id);
            this.state.clients.splice(index, 1);
            this.setState({ clients: this.state.clients });
        });
    }

    public async generateClient() {
        let random: Client = await this.clientLogic.generateRandomClient();

        this.clientLogic.addClient(random).then(client => {
            console.log("Random client added");
            console.log(client);
            this.state.clients.push(client);
            this.setState({ clients: this.state.clients });
        });
    }

    public render() {
        const clients = this.state.clients;
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
                    <button className="btn btn-primary" onClick={() => this.generateClient()}>
                        Generate Random Client
                    </button>
                </div>

                {clients.length === 0 && (
                    <div className="text-center">
                        <h2>No client found at the moment</h2>
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
                                                                this.deleteClient(
                                                                    client.id as number
                                                                )
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
