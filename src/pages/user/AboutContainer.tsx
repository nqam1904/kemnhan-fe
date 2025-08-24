import type { ReactNode } from 'react';
import React, { Component } from 'react';
import AboutComponents from '../../views/main/about/AboutComponents';

class AboutContainer extends Component<any, any> {
    render(): ReactNode {
        return <AboutComponents {...this.props} />;
    }
}

export default AboutContainer;
