import {
    EMPTY_FAVORITES_LIST,
    SET_FAVORITES_LIST,
} from "../actions/favoriteAction";


const initialState = {
    favorites: [],
    page: 0,
    lastPage: 0,
};

export default function favoriteReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case EMPTY_FAVORITES_LIST:
            nextState = {
                ...state,
                favorites: [],
                page: 0,
                lastPage: 0,
            };
            return nextState;
        case SET_FAVORITES_LIST:
            if (action.value.endReached) {
                nextState = {
                    ...state,
                    page: action.value.data.page,
                    lastPage: action.value.data.lastPage,
                    favorites: [...state.favorites, ...action.value.data.favorites],
                };
            } else {
                nextState = {
                    ...state,
                    ...action.value.data,
                };
            }
            return nextState;
        default:
            return state;
    }

}