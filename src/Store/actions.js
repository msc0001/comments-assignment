import store, {
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    SET_INITIAL_STATE,
    TOGGLE_SORT,
} from ".";

export const initialiseCommentsAction = () =>
    store.dispatch({ type: SET_INITIAL_STATE });

export const addCommentAction = (comment) =>
    store.dispatch({ type: ADD_COMMENT, comment });

export const deleteCommentAction = (commentId) =>
    store.dispatch({ type: DELETE_COMMENT, commentId });

export const editCommentAction = ({ commentId, newMessage }) =>
    store.dispatch({
        type: EDIT_COMMENT,
        commentId,
        newMessage,
    });

export const toggleSortOrderAction = () =>
    store.dispatch({
        type: TOGGLE_SORT,
    });
