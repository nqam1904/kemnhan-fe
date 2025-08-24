import React, { Component } from 'react';
import HeaderComponents from 'views/admin/header/HeaderComponents';
class HeaderContainer extends Component<any, any> {
    render(): React.ReactNode {
        return (
            <div>
                <HeaderComponents {...this.props} />
            </div>
        );
    }
}
export default HeaderContainer;
