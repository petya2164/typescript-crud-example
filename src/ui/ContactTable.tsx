import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { Contact } from "../interfaces/Contact";
import { ContactLogic } from "../businessLogic/ContactLogic";

interface IState {
    contacts: Contact[];
}

export default class ContactTable extends React.Component<RouteComponentProps, IState> {
    contactLogic: ContactLogic;

    constructor(props: RouteComponentProps) {
        super(props);
        this.contactLogic = new ContactLogic();
        this.state = { contacts: [] };
    }

    public componentDidMount(): void {
        this.contactLogic.getContacts().then(data => {
            this.setState({ contacts: data });
        });
    }

    public deleteContact(id: number) {
        this.contactLogic.deleteContact(id).then(() => {
            const index = this.state.contacts.findIndex(contact => contact.id === id);
            this.state.contacts.splice(index, 1);
            this.setState({ contacts: this.state.contacts });
        });
    }

    public async generateContact() {
        let random: Contact = await this.contactLogic.generateRandomContact();

        this.contactLogic.addContact(random).then(contact => {
            console.log("Random contact added");
            console.log(contact);
            this.state.contacts.push(contact);
            this.setState({ contacts: this.state.contacts });
        });
    }

    public render() {
        const contacts = this.state.contacts;
        return (
            <div className="container">
                <br />
                <div className="text-center">
                    <h2>Contacts</h2>
                </div>

                <div className="btn-toolbar">
                    <Link to={`contact_edit`} className="btn btn-success mr-2">
                        Create New Contact
                    </Link>
                    <button className="btn btn-primary" onClick={() => this.generateContact()}>
                        Generate Random Contact
                    </button>
                </div>

                {contacts.length === 0 && (
                    <div className="text-center">
                        <h2>No contact found at the moment</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts &&
                                    contacts.map(contact => (
                                        <tr key={contact.id}>
                                            <td>{contact.id}</td>
                                            <td>{contact.firstName}</td>
                                            <td>{contact.lastName}</td>
                                            <td>{contact.role}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.phone}</td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-toolbar">
                                                        <Link
                                                            to={`contact_edit/${contact.id}`}
                                                            className="btn btn-sm btn-outline-secondary mr-1"
                                                        >
                                                            Edit Contact
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() =>
                                                                this.deleteContact(
                                                                    contact.id as number
                                                                )
                                                            }
                                                        >
                                                            Delete Contact
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