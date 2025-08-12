import * as Types from '../action/categoryAction';

const initialState = {
    loading: false,
    data: null,
    error: null,
};
const categoryReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.CATEGORY:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data,
            });
        case Types.CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data,
            });

        case Types.CATEGORY_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error,
            });
        default:
            return state;
    }
};

export default categoryReducers;
