export const EMPTY_FAVORITES_LIST = "EMPTY_FAVORITES_LIST";
export const SET_FAVORITES_LIST = "SET_FAVORITES_LIST";

export function setFavoritesListAction(favorites, endReached = false) {
    return {
        type: SET_FAVORITES_LIST,
        value: {data:favorites,endReached: endReached},
    }
}

export function emptyFavoritesList() {
    return {
        type: EMPTY_FAVORITES_LIST,
        value: null,
    }
}