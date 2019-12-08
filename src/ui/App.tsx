import React from "react";
import "./App.css";
import { Switch, Route, withRouter, RouteComponentProps, Link } from "react-router-dom";

import ContactTable from "./ContactTable";
import ContactEdit from "./ContactEdit";
import ClientTable from "./ClientTable";
import ClientEdit from "./ClientEdit";
import LocationTable from "./LocationTable";
import LocationEdit from "./LocationEdit";
import SettingsPage from "./SettingsPage";

class App extends React.Component<RouteComponentProps<any>> {
    public render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/contact_table"}>Contacts</Link>
                        </li>

                        <li>
                            <Link to={"/client_table"}>Clients</Link>
                        </li>

                        <li>
                            <Link to={"/location_table"}>Locations</Link>
                        </li>

                        <li>
                            <Link to={"/client_meeting_table"}>ClientMeetings</Link>
                        </li>

                        <li>
                            <Link to={"/settings"}>Settings</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path={"/"} exact component={ContactTable} />
                    <Route path={"/contact_table"} exact component={ContactTable} />
                    <Route path={"/contact_edit"} exact component={ContactEdit} />
                    <Route path={"/contact_edit/:id"} exact component={ContactEdit} />
                    <Route path={"/client_table"} exact component={ClientTable} />
                    <Route path={"/client_edit"} exact component={ClientEdit} />
                    <Route path={"/client_edit/:id"} exact component={ClientEdit} />
                    <Route path={"/location_table"} exact component={LocationTable} />
                    <Route path={"/location_edit"} exact component={LocationEdit} />
                    <Route path={"/location_edit/:id"} exact component={LocationEdit} />
                    <Route path={"/settings"} exact component={SettingsPage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
