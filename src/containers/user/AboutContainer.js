import React, { Component } from 'react';
import AboutComponents from '../../components/user/about/AboutComponents';
class AboutContainer extends Component {
    render() {
        return <AboutComponents {...this.props} />;
    }
}

export default AboutContainer;
