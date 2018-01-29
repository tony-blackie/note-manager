import {
    EditHashtagState,
    ReducerAction,
    HandleSuccessfulGetHashtagPayload,
} from './types';
import { TypedAction, HashtagTypeAPI, HashtagType } from '../../generic/types';
import {
    GET_HASHTAG_SUCCESS,
    CHANGE_HASHTAG_NAME,
    SAVE_EDITED_HASHTAG,
    HASHTAG_CREATION_SUCCESS,
    HASHTAG_CREATION_FAIL,
    CLEAR_HASHTAG_NAME,
} from './constants';

const editHashtagReducer = (
    state: EditHashtagState = {
        hashtag: {
            name: '',
            id: 0,
            isRoot: false,
            parent: 0,
            notes: [],
        },
        errorMessage: '',
    },
    action: TypedAction<ReducerAction>
) => {
    switch (action.type) {
        case GET_HASHTAG_SUCCESS: {
            const { payload } = action as TypedAction<
                HandleSuccessfulGetHashtagPayload
            >;
            const {
                name,
                id,
                is_root,
                notes,
                parent,
            } = payload.hashtag as HashtagTypeAPI;

            return {
                ...state,
                hashtag: {
                    isRoot: is_root,
                    name: name,
                    id: id,
                    parent,
                    notes,
                },
            };
        }

        case CHANGE_HASHTAG_NAME: {
            const { text } = action.payload;

            return {
                ...state,
                hashtag: {
                    ...state.hashtag,
                    name: text,
                },
            };
        }

        case HASHTAG_CREATION_FAIL: {
            return {
                ...state,
                errorMessage: 'sorry, try later',
            };
        }

        case CLEAR_HASHTAG_NAME: {
            return {
                ...state,
                hashtag: {
                    ...state.hashtag,
                    name: '',
                },
            };
        }

        default:
            return state;
    }
};

export default editHashtagReducer;
