import React, { Component } from 'react';
import { NotificationContainer} from 'react-notifications';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { LoginWrapper as Login} from './components/Login/LoginWrapper';
import PrivateComponent from './components/PrivateComponent';
import { UserProfile } from './components/UserProfile';
import './ComponentsStyles/Login.css';
import './ComponentsStyles/UserDetails.css';
import './ComponentsStyles/ResolutionDetails.css';
import './ComponentsStyles/ResolutionList.css';
import './ComponentsStyles/Error.css';
import './ComponentsStyles/SideMenu.css';
import './ComponentsStyles/SideDrawer.css';
import './ComponentsStyles/Site.css';
import './ComponentsStyles/Backdrop.css';
import './ComponentsStyles/DrawerToggleButton.css';
import './ComponentsStyles/ResolutionResults.css';
import 'react-notifications/lib/notifications.css';
import 'react-datepicker/dist/react-datepicker.css';


class App extends Component {
    state = {
        token: localStorage.getItem("id_token"),
    }
    render() {
        return (
            <div>
                <NotificationContainer />

                <Router>
                    <Switch>
                        <Route exac path="/login" component={Login} />
                        <PrivateComponent path="/" component={UserProfile}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default withRouter(App);