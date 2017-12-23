import { QuestionnaireState, QuestionnaireAction } from './types';
import { TypedAction } from '../../generic/types';
import { CHANGE_FIELD, CHANGE_MSG, RESET_FIELDS } from './constants';

const questionnaireReducer = (state: QuestionnaireState = {
    message: '',
    colors: false,
    hashtags: false,
    i18n: false,
    importance: false,
    serverError: false,
    succes: false
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

        case RESET_FIELDS: {
            return {
                message: '',
                colors: false,
                hashtags: false,
                i18n: false,
                importance: false,
                serverError: false,
                succes: false
            }
        }
    }
    return state;
}

export default questionnaireReducer;
