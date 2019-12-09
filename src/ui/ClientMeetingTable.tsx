import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { ClientMeeting } from "../interfaces/ClientMeeting";
import { ClientMeetingLogic } from "../businessLogic/ClientMeetingLogic";

import EntityTableBase from "./EntityTableBase";

export default class ClientMeetingTable extends EntityTableBase<ClientMeeting> {
    constructor(props: RouteComponentProps) {
        super(props, new ClientMeetingLogic());
    }

    public render() {
        const clientMeetings = this.state.entities;
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
                    <button className="btn btn-primary" onClick={() => this.generateEntity()}>
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
                                                                this.deleteEntity(clientMeeting.id!)
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
