import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { ClientMeeting } from "../interfaces/ClientMeeting";
import { ClientMeetingLogic } from "../businessLogic/ClientMeetingLogic";

interface IState {
    clientMeetings: ClientMeeting[];
}

export default class ClientMeetingTable extends React.Component<RouteComponentProps, IState> {
    clientMeetingLogic: ClientMeetingLogic;

    constructor(props: RouteComponentProps) {
        super(props);
        this.clientMeetingLogic = new ClientMeetingLogic();
        this.state = { clientMeetings: [] };
    }

    public componentDidMount(): void {
        this.clientMeetingLogic.getClientMeetings().then(data => {
            this.setState({ clientMeetings: data });
        });
    }

    public deleteClientMeeting(id: number) {
        this.clientMeetingLogic.deleteClientMeeting(id).then(() => {
            const index = this.state.clientMeetings.findIndex(
                clientMeeting => clientMeeting.id === id
            );
            this.state.clientMeetings.splice(index, 1);
            this.setState({ clientMeetings: this.state.clientMeetings });
        });
    }

    public async generateClientMeeting() {
        let random: ClientMeeting = await this.clientMeetingLogic.generateRandomClientMeeting();

        this.clientMeetingLogic.addClientMeeting(random).then(clientMeeting => {
            console.log("Random clientmeeting added");
            console.log(clientMeeting);
            this.state.clientMeetings.push(clientMeeting);
            this.setState({ clientMeetings: this.state.clientMeetings });
        });
    }

    public render() {
        const clientMeetings = this.state.clientMeetings;
        return (
            <div className="container">
                <br />
                <div className="text-center">
                    <h2>ClientMeetings</h2>
                </div>

                <div className="btn-toolbar">
                    <Link to={`client_meeting_edit`} className="btn btn-success mr-2">
                        Create New ClientMeeting
                    </Link>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.generateClientMeeting()}
                    >
                        Generate Random ClientMeeting
                    </button>
                </div>

                {clientMeetings.length === 0 && (
                    <div className="text-center">
                        <h3>No client meeting found at the moment</h3>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Agenda</th>
                                    <th scope="col">Start date</th>
                                    <th scope="col">End date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientMeetings &&
                                    clientMeetings.map(clientMeeting => (
                                        <tr key={clientMeeting.id}>
                                            <td>{clientMeeting.id}</td>
                                            <td>{clientMeeting.title}</td>
                                            <td>{clientMeeting.agenda}</td>
                                            <td>{clientMeeting.startDate}</td>
                                            <td>{clientMeeting.endDate}</td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-toolbar">
                                                        <Link
                                                            to={`client_meeting_edit/${clientMeeting.id}`}
                                                            className="btn btn-sm btn-outline-secondary mr-1"
                                                        >
                                                            Edit Meeting
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() =>
                                                                this.deleteClientMeeting(
                                                                    clientMeeting.id as number
                                                                )
                                                            }
                                                        >
                                                            Delete Meeting
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
