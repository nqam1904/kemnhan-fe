import React, { Component } from 'react';
import logo from '../../logo.svg';

class NotFoundContainer extends Component {
    render() {
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
