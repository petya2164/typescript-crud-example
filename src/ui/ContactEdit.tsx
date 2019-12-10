import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Contact } from "../interfaces/Contact";
import { ContactLogic } from "../businessLogic/ContactLogic";

import EntityEditBase from "./EntityEditBase";

export class ContactEdit extends EntityEditBase<Contact> {
    constructor(props: RouteComponentProps) {
        super(props, new ContactLogic(), "/contact_table");
    }

    public render() {
        const { loading } = this.state;
        return (
            <div className="App">
                {this.state.entity && (
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2> Edit/Create Contact </h2>

                            {this.renderInfoMessage()}

                            <form
                                id={"create-post-form"}
                                onSubmit={this.processFormSubmission}
                                noValidate={true}
                            >
                                <div className="form-group col-md-12">
                                    <label htmlFor="first_name"> First Name </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        defaultValue={this.state.entity.firstName}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter contact's first name"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="last_name"> Last Name </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        defaultValue={this.state.entity.lastName}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter contact's last name"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="description"> Role </label>
                                    <input
                                        type="text"
                                        id="role"
                                        defaultValue={this.state.entity.role}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter contact's role"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="email"> Email </label>
                                    <input
                                        type="email"
                                        id="email"
                                        defaultValue={this.state.entity.email}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter contact's email address"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="phone"> Phone </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        defaultValue={this.state.entity.phone}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter contact's phone number"
                                    />
                                </div>

                                <div className="form-group col-md-4 pull-right">
                                    <button className="btn btn-success" type="submit">
                                        Edit/Create contact{" "}
                                    </button>
                                    {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(ContactEdit);
