import { combineReducers } from 'redux';
import editNoteReducer from '../views/EditNote/reducer';
import editFolderReducer from '../views/EditFolder/reducer';
import appReducer from '../views/App/reducer';

const rootReducer = combineReducers({
    editNote: editNoteReducer,
    editFolder: editFolderReducer,
    app: appReducer
});

export default rootReducer;