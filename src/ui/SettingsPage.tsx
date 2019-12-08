import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface IState {
    settings: string;
}

export default class SettingsPage extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { settings: "" };
    }

    public componentDidMount(): void {
        // axios.get(`http://localhost:5000/contacts`).then(value => {
        //     this.setState({ settings: value });
        // });
    }

    public render() {
        return (
            <div>
                <br />
                <div className="text-center">
                    <h2>Settings</h2>
                </div>
            </div>
        );
    }
}
