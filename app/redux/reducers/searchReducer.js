import {TOGGLE_MODAL, CHARGE_MODAL, CLOSE_MODAL} from "../actions/searchAction";

const initialState = {
    visible: false,
    charged: false,
    navigation: null,
};

export default function searchReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case TOGGLE_MODAL:
            nextState = {
                ...state,
                visible: !state.visible,
            };
            return nextState;
        case CHARGE_MODAL:
            nextState = {
                ...state,
                charged: true,
                navigation: action.value
            };
            return nextState;
        case CLOSE_MODAL:
            nextState = {
                ...state,
                visible: false,
            };
            return nextState;
        default:
            return state;
    }
}