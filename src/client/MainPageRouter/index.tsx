import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from '../../routes';

import AuthRoute from '../components/AuthRoute';
import Memeno from './Memeno';
import Login from './Login';

const Index: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={routes.login}>
                    <Login />
                </Route>
                <AuthRoute
                    path={routes.root}
                    authPath={routes.react.login.noFail}
                    errorPath={routes.react.login.serverErrorResponse}
                >
                    <Memeno />
                </AuthRoute>
            </Switch>
        </Router>
    );
};

export default Index;
