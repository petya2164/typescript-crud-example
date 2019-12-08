import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Contact } from "../interfaces/Contact";
import { ContactLogic } from "../businessLogic/ContactLogic";

export interface IFormState {
    id: number;
    contact: Partial<Contact>;
    submitSuccess: boolean;
    loading: boolean;
}

class ContactEdit extends React.Component<RouteComponentProps<any>, IFormState> {
    contactLogic: ContactLogic;

    constructor(props: RouteComponentProps) {
        super(props);

        this.contactLogic = new ContactLogic();

        this.state = {
            // The id will be undefined when creating a new item
            id: this.props.match.params.id,
            contact: {},
            loading: false,
            submitSuccess: false
        };
    }

    public componentDidMount(): void {
        // Retrieve current item if the id is defined
        if (this.state.id) {
            this.contactLogic.getContact(this.state.id).then(data => {
                this.setState({ contact: data });
            });
        }
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });

        const handleCompletion = (contact: Contact) => {
            console.log("Contact id: " + contact.id);
            this.setState({ submitSuccess: true, loading: false });
            setTimeout(() => {
                this.props.history.push("/contact_table");
            }, 1000);
        };

        // Update the current item if the id is defined
        if (this.state.id) {
            this.contactLogic.updateContact(this.state.contact as Contact).then(handleCompletion);
        } else {
            // Otherwise create a new item
            this.contactLogic.addContact(this.state.contact as Contact).then(handleCompletion);
        }
    };

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let contact: any = this.state.contact;
        contact[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ contact: contact });
    };

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.contact && (
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2> Edit/Create Contact </h2>

                            {submitSuccess && (
                                <div className="alert alert-info" role="alert">
                                    Operation has completed successfully!{" "}
                                </div>
                            )}

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
                                        defaultValue={this.state.contact.firstName}
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
                                        defaultValue={this.state.contact.lastName}
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
                                        defaultValue={this.state.contact.role}
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
                                        defaultValue={this.state.contact.email}
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
                                        defaultValue={this.state.contact.phone}
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
