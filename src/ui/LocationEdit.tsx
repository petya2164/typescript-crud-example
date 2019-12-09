import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Location } from "../interfaces/Location";
import { LocationLogic } from "../businessLogic/LocationLogic";

import EntityEditBase from "./EntityEditBase";

export class LocationEdit extends EntityEditBase<Location> {
    constructor(props: RouteComponentProps) {
        super(props, new LocationLogic(), "/location_table");
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.entity && (
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2> Edit/Create Location </h2>

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
                                    <label htmlFor="name"> Location Name </label>
                                    <input
                                        type="text"
                                        id="name"
                                        defaultValue={this.state.entity.name}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter location's name"
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
                                        placeholder="Enter location's description"
                                    />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="phone"> Address </label>
                                    <input
                                        type="text"
                                        id="address"
                                        defaultValue={this.state.entity.address}
                                        onChange={e => this.handleInputChanges(e)}
                                        className="form-control"
                                        placeholder="Enter location's address"
                                    />
                                </div>

                                <div className="form-group col-md-4 pull-right">
                                    <button className="btn btn-success" type="submit">
                                        Edit/Create location{" "}
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

export default withRouter(LocationEdit);
