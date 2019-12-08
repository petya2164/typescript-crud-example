import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Client } from "../interfaces/Client";
import { ClientLogic } from "../businessLogic/ClientLogic";

export interface IFormState {
    id: number;
    client: Partial<Client>;
    submitSuccess: boolean;
    loading: boolean;
}

class ClientEdit extends React.Component<RouteComponentProps<any>, IFormState> {
    clientLogic: ClientLogic;

    constructor(props: RouteComponentProps) {
        super(props);

        this.clientLogic = new ClientLogic();

        this.state = {
            // The id will be undefined when creating a new item
            id: this.props.match.params.id,
            client: {},
            loading: false,
            submitSuccess: false
        };
    }

    public componentDidMount(): void {
        // Retrieve current item if the id is defined
        if (this.state.id) {
            this.clientLogic.getClient(this.state.id).then(data => {
                this.setState({ client: data });
            });
        }
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });

        const handleCompletion = (client: Client) => {
            console.log("Client id: " + client.id);
            this.setState({ submitSuccess: true, loading: false });
            setTimeout(() => {
                this.props.history.push("/client_table");
            }, 1000);
        };

        // Update the current item if the id is defined
        if (this.state.id) {
            this.clientLogic.updateClient(this.state.client as Client).then(handleCompletion);
        } else {
            // Otherwise create a new item
            this.clientLogic.addClient(this.state.client as Client).then(handleCompletion);
        }
    };

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let client: any = this.state.client;
        client[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ client: client });
    };

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.client && (
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2> Edit/Create Client </h2>

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
                                    <label htmlFor="first_name"> Company Name </label>
                                    <input
                                        type="text"
                                        id="name"
                                        defaultValue={this.state.client.name}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter client's name"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="description"> Description </label>
                                    <input
                                        type="text"
                                        id="description"
                                        defaultValue={this.state.client.description}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter client's description"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="phone"> Sector </label>
                                    <input
                                        type="text"
                                        id="sector"
                                        defaultValue={this.state.client.sector}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter client's main sector"
                                    />
                                </div>

                                <div className="form-group col-md-4 pull-right">
                                    <button className="btn btn-success" type="submit">
                                        Edit/Create client{" "}
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

export default withRouter(ClientEdit);
