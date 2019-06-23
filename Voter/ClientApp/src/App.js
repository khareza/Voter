import React, { Component } from 'react';
import { NotificationContainer} from 'react-notifications';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { LoginWrapper as Login} from './components/Login/LoginWrapper';
import PrivateComponent from './components/PrivateComponent';
import { Main } from './components/Main';
import 'react-notifications/lib/notifications.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ComponentsStyles/DrawerToggleButton.css';
import './ComponentsStyles/ResolutionResults.css';
import './ComponentsStyles/ResolutionDetails.css';
import './ComponentsStyles/ResolutionList.css';
import './ComponentsStyles/UserDetails.css';
import './ComponentsStyles/SideDrawer.css';
import './ComponentsStyles/SideMenu.css';
import './ComponentsStyles/Backdrop.css';
import './ComponentsStyles/Error.css';
import './ComponentsStyles/Login.css';
import './ComponentsStyles/Site.css';
import './ComponentsStyles/UserList.css';
import './ComponentsStyles/ActiveUserDetails.css';
import './ComponentsStyles/Dialogs.css';
import './ComponentsStyles/Charts.css';
import './ComponentsStyles/ResidentsWithVotes.css';
import './ComponentsStyles/LoadingSpinner.css';
import './ComponentsStyles/ResolutionGroup.css';
import './ComponentsStyles/ResolutionHistory.css';
import './ComponentsStyles/UserMenu.css';
import './ComponentsStyles/ResolutionPrint.css';


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
                        <PrivateComponent path="/" component={Main}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default withRouter(App);