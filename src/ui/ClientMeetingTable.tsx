import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { ClientMeeting } from "../interfaces/ClientMeeting";
import { ClientMeetingLogic } from "../businessLogic/ClientMeetingLogic";

import EntityTableBase from "./EntityTableBase";

export default class ClientMeetingTable extends EntityTableBase<ClientMeeting> {
    constructor(props: RouteComponentProps) {
        super(props, new ClientMeetingLogic());
    }

    public getEntityLabel(): string {
        return "ClientMeeting";
    }

    public getEntityLabelPlural(): string {
        return "ClientMeetings";
    }

    public getEditURL(): string {
        return "client_meeting_edit";
    }

    renderTableHeader(): JSX.Element {
        return (
            <React.Fragment>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Agenda</th>
                <th scope="col">Start date</th>
                <th scope="col">End date</th>
                <th scope="col">Actions</th>
            </React.Fragment>
        );
    }

    renderTableRow(clientMeeting: ClientMeeting): JSX.Element {
        return (
            <React.Fragment>
                <td>{clientMeeting.id}</td>
                <td>{clientMeeting.title}</td>
                <td>{clientMeeting.agenda}</td>
                <td>{clientMeeting.startDate}</td>
                <td>{clientMeeting.endDate}</td>
            </React.Fragment>
        );
    }
}
