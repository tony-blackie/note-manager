import { QuestionnaireState, QuestionnaireAction } from './types';
import { TypedAction } from '../../generic/types';
import { CHANGE_MSG } from './constants';

const questionnaireReducer = (state: QuestionnaireState = {
    message: ''
}, action: TypedAction<QuestionnaireAction>) => {
    switch (action.type) {
        case CHANGE_MSG: {
            const { message } = action.payload;
            return {
                ...state,
                message: message
            }
        }
    }
    return state;
}

export default questionnaireReducer;
