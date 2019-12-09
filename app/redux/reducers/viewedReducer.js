import {ADD_TO_VIEWED, SHOW_NEXT_PAGE} from "../actions/viewedPostsAction";
import {paginate} from "../../helpers/functions";
import {PER_PAGE} from "../../config/global";

const initialState = {
    totalPosts: [],
    posts: [],
    page: 0,
    lastPage: 0,
};

export default function viewedReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case ADD_TO_VIEWED:
            const exists = ~state.posts.findIndex(post => post.id === action.value.id);
            if (!exists){
                const totalPosts = [action.value, ...state.posts];
                const data = paginate(totalPosts,1, PER_PAGE);
                const page = data.page;
                const lastPage = data.total_pages;
                const posts = data.data;

                nextState = {
                    ...state,
                    totalPosts: [action.value, ...state.posts],
                    posts: posts,
                    page: page,
                    lastPage: lastPage,
                };
            }
            return nextState;
        case SHOW_NEXT_PAGE:
            nextState = {
                ...state,
                ...action.value,
            };
            return nextState;
        default:
            return state;
    }
}