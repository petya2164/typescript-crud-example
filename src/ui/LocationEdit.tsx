import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Location } from "../interfaces/Location";
import { LocationLogic } from "../businessLogic/LocationLogic";

export interface IFormState {
    id: number;
    location: Partial<Location>;
    submitSuccess: boolean;
    loading: boolean;
}

class LocationEdit extends React.Component<RouteComponentProps<any>, IFormState> {
    locationLogic: LocationLogic;

    constructor(props: RouteComponentProps) {
        super(props);

        this.locationLogic = new LocationLogic();

        this.state = {
            // The id will be undefined when creating a new item
            id: this.props.match.params.id,
            location: {},
            loading: false,
            submitSuccess: false
        };
    }

    public componentDidMount(): void {
        // Retrieve current item if the id is defined
        if (this.state.id) {
            this.locationLogic.getLocation(this.state.id).then(data => {
                this.setState({ location: data });
            });
        }
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });

        const handleCompletion = (location: Location) => {
            console.log("Location id: " + location.id);
            this.setState({ submitSuccess: true, loading: false });
            setTimeout(() => {
                this.props.history.push("/location_table");
            }, 1000);
        };

        // Update the current item if the id is defined
        if (this.state.id) {
            this.locationLogic
                .updateLocation(this.state.location as Location)
                .then(handleCompletion);
        } else {
            // Otherwise create a new item
            this.locationLogic.addLocation(this.state.location as Location).then(handleCompletion);
        }
    };

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let location: any = this.state.location;
        location[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ location: location });
    };

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.location && (
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
                                    <label htmlFor="first_name"> Location Name </label>
                                    <input
                                        type="text"
                                        id="name"
                                        defaultValue={this.state.location.name}
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
                                        defaultValue={this.state.location.description}
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
                                        defaultValue={this.state.location.address}
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
