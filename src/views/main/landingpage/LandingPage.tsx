import ImageAssets from 'constants/ImagesAsset';
import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component<any, any> {
    render(): React.ReactNode {
        return (
            <div className="landing" id="home">
                <img alt="landing background" src={ImageAssets.bg3} />
            </div>
        );
    }
}

export default LandingPage;
