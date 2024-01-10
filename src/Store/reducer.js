import {
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    SET_INITIAL_STATE,
    TOGGLE_SORT,
} from ".";
import { getComments } from "../Helpers";

const initialState = {
    counts: 0,
    commentDetails: {},
    connections: {},
    comments: [],
    sortOrder: 0, // 0 - decending, 1-acending
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_INITIAL_STATE: {
            if (state.comments) {
                return state;
            }
            const { counts, comments, commentDetails, connections } =
                getComments();
            return {
                ...state,
                comments,
                commentDetails,
                connections,
                counts,
            };
        }
        case ADD_COMMENT: {
            const { comment } = action;
            let { comments, counts, connections, commentDetails, sortOrder } =
                state;

            counts += 1;

            comment.id = counts;

            commentDetails = {
                ...commentDetails,
                [comment.id]: {
                    ...comment,
                    createdAt: Date.now(),
                },
            };

            const addAhead = sortOrder === 0;

            if (!comment.parent) {
                comments = addAhead
                    ? [comment.id, ...state.comments]
                    : [...state.comments, comment.id];
            } else {
                connections = {
                    ...connections,
                    [comment.parent]: addAhead
                        ? [comment.id, ...(connections[comment.parent] || [])]
                        : [...(connections[comment.parent] || []), comment.id],
                };
            }

            return {
                ...state,
                comments,
                commentDetails,
                connections,
                counts,
            };
        }
        case DELETE_COMMENT: {
            const { commentId } = action;
            let { commentDetails, comments, connections } = state;

            const comment = commentDetails[commentId];

            if (!comment) {
                return state;
            }

            commentDetails = {
                ...commentDetails,
                [commentId]: undefined,
            };

            if (!comment.parent) {
                comments = comments.filter((id) => id !== commentId);
            } else {
                const children = connections[comment.parent].filter(
                    (id) => id !== commentId
                );

                connections = {
                    ...connections[comment.parent],
                    [comment.parent]: children,
                };
            }

            return {
                ...state,
                comments,
                commentDetails,
                connections,
            };
        }
        case EDIT_COMMENT: {
            const { commentId, newMessage } = action;
            const { commentDetails } = state;

            if (!commentDetails[commentId]) {
                return state;
            }

            const comment = commentDetails[commentId];

            if (comment.message === newMessage || !newMessage) {
                return state;
            }

            return {
                ...state,
                commentDetails: {
                    ...commentDetails,
                    [commentId]: {
                        ...comment,
                        message: newMessage,
                        edited: true,
                    },
                },
            };
        }
        case TOGGLE_SORT: {
            const newSortOrder = !state.sortOrder;

            const comments = [...state.comments].reverse();

            const connections = {};
            Object.keys(state.connections).forEach((id) => {
                connections[id] = [...state.connections[id]].reverse();
            });

            return {
                ...state,
                sortOrder: newSortOrder,
                comments,
                connections,
            };
        }
        default:
            return state;
    }
};

export default reducer;
