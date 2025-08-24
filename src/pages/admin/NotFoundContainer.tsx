import logo from 'logo.svg';
import React, { Component } from 'react';

class NotFoundContainer extends Component<any, any> {
    render(): React.ReactNode {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <h1>404! Không tìm thấy trang 😥</h1>
            </div>
        );
    }
}

export default NotFoundContainer;
