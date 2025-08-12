import React, { Component } from 'react';
import { Spinner } from 'react-activity';
export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }
    render() {
        return (
            <div className="loading">
                <Spinner size={32} speed={1} animating={true} className="spinner" />
            </div>
        );
    }
}
