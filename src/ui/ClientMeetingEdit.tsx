import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { ClientMeeting } from "../interfaces/ClientMeeting";
import { ClientMeetingLogic } from "../businessLogic/ClientMeetingLogic";

import EntityEditBase from "./EntityEditBase";

export class ClientMeetingEdit extends EntityEditBase<ClientMeeting> {
    constructor(props: RouteComponentProps) {
        super(props, new ClientMeetingLogic(), "/client_meeting_table");
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.entity && (
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
                                        defaultValue={this.state.entity.title}
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
                                        defaultValue={this.state.entity.agenda}
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
                                        defaultValue={this.state.entity.startDate}
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
                                        defaultValue={this.state.entity.endDate}
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
