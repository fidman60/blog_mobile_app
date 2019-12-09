import {STORE_AUTH_DATA, STORE_USER_IMAGE} from "../actions/userActions";

const initialState = {
    token: null,
    user: null,
    login_type: null,
};

export default function userReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case STORE_AUTH_DATA:
            nextState = {
                ...state,
                ...action.value
            };
            return nextState;
        case STORE_USER_IMAGE:
            nextState = {
                ...state,
                user: {
                    ...state.user,
                    image: action.value
                }
            };
            return nextState;
        default:
            return state;
    }
}