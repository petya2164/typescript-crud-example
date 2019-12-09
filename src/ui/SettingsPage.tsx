import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SettingsLogic } from "../businessLogic/SettingsLogic";

interface IState {
    backend: string;
}

export default class SettingsPage extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { backend: "" };
    }

    public componentDidMount(): void {
        this.setState({ backend: SettingsLogic.currentBackend() });
    }

    public switchBackend() {
        let newBackend = SettingsLogic.changeBackend();
        this.setState({ backend: newBackend });
    }

    public render() {
        return (
            <div className="container align-items-center">
                <br />
                <div className="text-center">
                    <h2>Settings</h2>
                </div>

                <br />
                <div className="text-center">
                    <h4>Current backend: {this.state.backend}</h4>
                </div>

                <button className="btn btn-primary btn-block" onClick={() => this.switchBackend()}>
                    Switch Backend
                </button>
            </div>
        );
    }
}
