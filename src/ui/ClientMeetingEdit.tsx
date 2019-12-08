import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { ClientMeeting } from "../interfaces/ClientMeeting";
import { ClientMeetingLogic } from "../businessLogic/ClientMeetingLogic";

export interface IFormState {
    id: number;
    clientMeeting: Partial<ClientMeeting>;
    submitSuccess: boolean;
    loading: boolean;
}

class ClientMeetingEdit extends React.Component<RouteComponentProps<any>, IFormState> {
    clientMeetingLogic: ClientMeetingLogic;

    constructor(props: RouteComponentProps) {
        super(props);

        this.clientMeetingLogic = new ClientMeetingLogic();

        this.state = {
            // The id will be undefined when creating a new item
            id: this.props.match.params.id,
            clientMeeting: {},
            loading: false,
            submitSuccess: false
        };
    }

    public componentDidMount(): void {
        // Retrieve current item if the id is defined
        if (this.state.id) {
            this.clientMeetingLogic.getClientMeeting(this.state.id).then(data => {
                this.setState({ clientMeeting: data });
            });
        }
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });

        const handleCompletion = (clientMeeting: ClientMeeting) => {
            console.log("ClientMeeting id: " + clientMeeting.id);
            this.setState({ submitSuccess: true, loading: false });
            setTimeout(() => {
                this.props.history.push("/client_meeting_table");
            }, 1000);
        };

        // Update the current item if the id is defined
        if (this.state.id) {
            this.clientMeetingLogic
                .updateClientMeeting(this.state.clientMeeting as ClientMeeting)
                .then(handleCompletion);
        } else {
            // Otherwise create a new item
            this.clientMeetingLogic
                .addClientMeeting(this.state.clientMeeting as ClientMeeting)
                .then(handleCompletion);
        }
    };

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let clientMeeting: any = this.state.clientMeeting;
        clientMeeting[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ clientMeeting: clientMeeting });
    };

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.clientMeeting && (
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2> Edit/Create Client Meeting </h2>

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
                                    <label htmlFor="title"> Meeting Title </label>
                                    <input
                                        type="text"
                                        id="title"
                                        defaultValue={this.state.clientMeeting.title}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter the title"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="description"> Agenda </label>
                                    <input
                                        type="text"
                                        id="agenda"
                                        defaultValue={this.state.clientMeeting.agenda}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter the agenda"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="startdate"> Start Date </label>
                                    <input
                                        type="text"
                                        id="startDate"
                                        defaultValue={this.state.clientMeeting.startDate}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter the start date"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="startdate"> End Date </label>
                                    <input
                                        type="text"
                                        id="endDate"
                                        defaultValue={this.state.clientMeeting.endDate}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter the end date"
                                    />
                                </div>

                                <div className="form-group col-md-4 pull-right">
                                    <button className="btn btn-success" type="submit">
                                        Edit/Create client meeting{" "}
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

export default withRouter(ClientMeetingEdit);
