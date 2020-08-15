import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import { IsAuth } from '../../../api/responses';
import routes from '../../../routes';

import Waiting from '../../MainPageRouter/Waiting';

const Index = ({ children, authPath, errorPath, path, ...rest }) => {
    const [isAuth, setAuth] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        setAuth(false);
        axios
            .get<IsAuth>(routes.server.auth.isAuth)
            .then((res) => {
                const { from } =
                    location.state || res.data.isAuth
                        ? { from: { pathname: path } }
                        : { from: { pathname: authPath } };

                setAuth(res.data.isAuth);
                history.replace(from);
            })
            .catch(() => {
                const { from } = location.state || {
                    from: { pathname: errorPath },
                };

                setAuth(false);
                history.replace(from);
            });
    }, []);

    return (
        <Route {...rest} render={() => (!isAuth ? <Waiting /> : children)} />
    );
};

export default Index;
