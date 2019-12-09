import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Client } from "../interfaces/Client";
import { ClientLogic } from "../businessLogic/ClientLogic";

import EntityEditBase from "./EntityEditBase";

export class ClientEdit extends EntityEditBase<Client> {
    constructor(props: RouteComponentProps) {
        super(props, new ClientLogic(), "/client_table");
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.entity && (
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
                                    <label htmlFor="name"> Company Name </label>
                                    <input
                                        type="text"
                                        id="name"
                                        defaultValue={this.state.entity.name}
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
                                        defaultValue={this.state.entity.description}
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
                                        defaultValue={this.state.entity.sector}
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
