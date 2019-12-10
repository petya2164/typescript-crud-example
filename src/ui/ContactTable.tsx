import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { Contact } from "../interfaces/Contact";
import { ContactLogic } from "../businessLogic/ContactLogic";

import EntityTableBase from "./EntityTableBase";

export default class ContactTable extends EntityTableBase<Contact> {
    constructor(props: RouteComponentProps) {
        super(props, new ContactLogic());
    }

    public getEntityLabel(): string {
        return "Contact";
    }

    public getEntityLabelPlural(): string {
        return "Contacts";
    }

    public getEditURL(): string {
        return "contact_edit";
    }

    renderTableHeader(): JSX.Element {
        return (
            <React.Fragment>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
            </React.Fragment>
        );
    }

    renderTableRow(contact: Contact): JSX.Element {
        return (
            <React.Fragment>
                <td>{contact.id}</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.role}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
            </React.Fragment>
        );
    }
}
