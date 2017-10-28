import CheckIn from '../views/CheckIn/CheckIn';
import { combineReducers } from 'redux';
import editNoteReducer from '../views/EditNote/reducer';
import editFolderReducer from '../views/EditFolder/reducer';
import appReducer from '../views/App/reducer';
import loginReducer from '../views/Login/reducer';
import checkIn from '../views/CheckIn/reducer';

const rootReducer = combineReducers({
    editNote: editNoteReducer,
    editFolder: editFolderReducer,
    app: appReducer,
    login: loginReducer,
    checkIn
});

export default rootReducer;