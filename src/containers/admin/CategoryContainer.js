import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryComponents from '../../components/admin/category/CategoryComponents';
import { categoryAction } from '../../redux/action/categoryAction';

class CategoryContainer extends Component {
    render() {
        return (
            <div>
                <CategoryComponents {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.categoryReducers.loading,
        data: state.categoryReducers.data,
        error: state.categoryReducers.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        categoryAction: (data) => {
            dispatch(categoryAction(data));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
