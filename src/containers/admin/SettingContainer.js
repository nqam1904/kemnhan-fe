import React, { Component } from 'react';
import SettingComponent from '../../components/admin/setting/SettingComponent';

class Setting extends Component {
    render() {
        return <SettingComponent {...this.props} />;
    }
}

export default Setting;
