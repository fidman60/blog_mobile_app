export const ADD_TO_VIEWED = "ADD_TO_VIEWED";
export const SHOW_NEXT_PAGE = "SHOW_NEXT_PAGE";

export function addToViewedAction(post) {
    return {
        type: ADD_TO_VIEWED,
        value: post
    }
}

export function showNextPageAction(data) {
    return {
        type: SHOW_NEXT_PAGE,
        value: data
    }
}