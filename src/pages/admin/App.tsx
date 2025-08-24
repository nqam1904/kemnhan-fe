import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../routes';
import HeaderContainer from './HeaderContainer';

interface RouteConfig {
    path: string;
    exact: boolean;
    main: () => React.ReactElement;
}

class App extends Component<any, any> {
    showContent = (routes: RouteConfig[]) => {
        if (!routes.length) return null;
        return (
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.main()} />
                ))}
            </Routes>
        );
    };

    render(): React.ReactNode {
        return (
            <>
                <HeaderContainer />
                <div className="container-fluid">{this.showContent(routes)}</div>
            </>
        );
    }
}

export default App;
