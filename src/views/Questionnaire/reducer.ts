import { QuestionnaireState, QuestionnaireAction } from './types';
import { TypedAction } from '../../generic/types';
import {
    CHANGE_FIELD,
    CHANGE_MSG,
    RESET_FIELDS,
    CHANGE_STATUS_TO_FAILED,
    CHANGE_STATUS_TO_SUCCESS
} from './constants';

const questionnaireReducer = (state: QuestionnaireState = {
    message: '',
    colors: false,
    hashtags: false,
    i18n: false,
    importance: false,
    serverError: false,
    success: false
}, action: TypedAction<QuestionnaireAction>) => {
    switch (action.type) {
        case CHANGE_MSG: {
            const { message } = action.payload;
            return {
                ...state,
                message: message
            }
        }

        case CHANGE_FIELD: {
            const { field } = action.payload;

            return {
                ...state,
                [field]: !state[field]
            }
        }

        case CHANGE_STATUS_TO_FAILED: {
            return {
                ...state,
                serverError: true,
                success: false
            };
        }

        case CHANGE_STATUS_TO_SUCCESS: {
            return {
                ...state,
                serverError: false,
                success: true
            };
        }

        case RESET_FIELDS: {
            return {
                message: '',
                colors: false,
                hashtags: false,
                i18n: false,
                importance: false,
                serverError: false,
                success: false
            }
        }
    }
    return state;
}

export default questionnaireReducer;
