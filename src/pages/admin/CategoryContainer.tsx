import React, { Component } from 'react';
import { connect } from 'react-redux';
// Removed legacy actions import (not present in this project)
import CategoryComponents from 'views/admin/category/CategoryComponents';

class CategoryContainer extends Component<any, any> {
    render(): React.ReactNode {
        return (
            <div>
                <CategoryComponents {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        loading: state.categoryReducers.loading,
        data: state.categoryReducers.data,
        error: state.categoryReducers.error,
    };
};
const mapDispatchToProps = (_dispatch: any) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
