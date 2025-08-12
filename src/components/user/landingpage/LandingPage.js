import React, { Component } from 'react';
import ImageAssets from '../../../constants/ImagesAsset';
import './LandingPage.css';
class LandingPage extends Component {
    render() {
        return (
            <div className="landing" id="home">
                <img alt="landing background" src={ImageAssets.bg3} />
            </div>
        );
    }
}
export default LandingPage;
