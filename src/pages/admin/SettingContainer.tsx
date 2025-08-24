import React, { Component } from 'react';
import SettingComponent from 'views/admin/setting/SettingComponent';

class Setting extends Component<any, any> {
    render(): React.ReactNode {
        return <SettingComponent {...this.props} />;
    }
}

export default Setting;
