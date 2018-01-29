import CheckIn from '../views/CheckIn/CheckIn';
import { combineReducers } from 'redux';
import editNoteReducer from '../views/EditNote/reducer';
import editHashtagReducer from '../views/EditHashtag/reducer';
import appReducer from '../views/App/reducer';
import loginReducer from '../views/Login/reducer';
import checkInReducer from '../views/CheckIn/reducer';
import questionnaireReducer from '../views/Questionnaire/reducer';

const rootReducer = combineReducers({
    editNote: editNoteReducer,
    editHashtag: editHashtagReducer,
    app: appReducer,
    login: loginReducer,
    checkIn: checkInReducer,
    questionnaire: questionnaireReducer,
});

export default rootReducer;
