import { QuestionnaireState, QuestionnaireAction } from './types';
import { TypedAction } from '../../generic/types';
import { CHANGE_MSG, CHANGE_CHECKBOX } from './constants';

const questionnaireReducer = (state: QuestionnaireState = {
    message: '',
    colors: false,
    hashtags: false,
    i18n: false,
    importance: false
}, action: TypedAction<QuestionnaireAction>) => {
    switch (action.type) {
        case CHANGE_MSG: {
            const { message } = action.payload;
            return {
                ...state,
                message: message
            }
        }

        case CHANGE_CHECKBOX: {
            const { field } = action.payload;
            return {
                ...state,
                [field]: !state[field]
            }
        }
    }
    return state;
}

export default questionnaireReducer;
