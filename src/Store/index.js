import { configureStore } from '@reduxjs/toolkit'
import { getComments } from '../Helpers/index';

const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';

const initialState = {
    id: 0,
    commentDetails: {},
    connections: {},
    comments: null
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_INITIAL_STATE: {
            if (state.comments) {
                return state;
            }
            const { counts, comments, commentDetails, connections } = getComments();
            return {
                ...state,
                comments,
                commentDetails,
                connections,
                counts
            }
        }
        case ADD_COMMENT: {
            const { comment } = action;
            let { comments, counts, connections, commentDetails } = state;
            
            counts += 1;

            comment.id = counts;
            
            commentDetails = {
                ...commentDetails,
                [comment.id]: {
                    ...comment,
                    createdAt: Date.now()
                }
            }
            
            if (!comment.parent) {
                comments = [...state.comments, comment.id];
            } else {
                connections[comment.parent] = {
                    ...connections,
                    [comment.parent]: [...connections[comment.parent], comment.id]
                }
            }

            return {
                ...state,
                comments,
                commentDetails,
                connections,
                counts
            };
        }
        case DELETE_COMMENT: {
            const { commentId } = action;
            let {
                commentDetails,
                comments,
                connections
            } = state.commentDetails;

            const comment = commentDetails[commentId];

            if (!comment) {
                return state;
            }

            commentDetails = {
                ...commentDetails,
                [commentId]: undefined
            }

            if (!comment.parent) {
                comments = comments.filter(id => id !== commentId);
            } else {
                const children = connections[comment.parent].filter(id => id !== commentId);
                
                connections = {
                    ...connections[comment.parent],
                    [comment.parent]: children
                }
            }

            return {
                ...state,
                comments,
                commentDetails,
                connections
            }
        }
        case EDIT_COMMENT: {
            const { commentId, newMessage } = action;
            const { commentDetails } = state;

            if (!commentDetails[commentId]) {
                return state;
            }

            const comment = commentDetails[commentId];

            if (comment.message === newMessage) {
                return state;
            }

            return {
                ...state,
                commentDetails: {
                    ...commentDetails,
                    [commentId]: {
                        ...comment,
                        message: newMessage,
                        edited: true
                    }
                }
            }
        }
        default:
            return state;
    }
}


const store = configureStore({ reducer });

export const initialiseCommentsAction = () => store.dispatch({ type: SET_INITIAL_STATE });

export const addCommentAction = (comment) =>
    store.dispatch({ type: ADD_COMMENT, comment });

export const deleteCommentAction = (commentId) => 
    store.dispatch({ type: DELETE_COMMENT, commentId });

export const editCommentAction = ({ commentId, newMessage }) => store.dispatch({
    type: EDIT_COMMENT,
    commentId,
    newMessage
})

export default store;