import { EditNoteState } from '../views/EditNote/types';
import { AppComponentState } from '../views/App/types';
import { EditHashtagState } from '../views/EditHashtag/types';
import { LoginState } from '../views/Login/types';
import { CheckInState } from '../views/CheckIn/types';
import { QuestionnaireState } from '../views/Questionnaire/types';

export interface Store {
    editNote: EditNoteState;
    editHashtag: EditHashtagState;
    app: AppComponentState;
    login: LoginState;
    checkIn: CheckInState;
    questionnaire: QuestionnaireState;
}

export interface NoteType {
    id: number;
    hashtags: HashtagType[];
    name: string;
    text: string;
    date: string;
}

export interface HashtagType {
    id: number;
    name: string;
}

export interface HashtagTypeAPI {
    id: number;
    name: string;
}

export interface TypedAction<payload> {
    type: string;
    payload?: payload;
}

export interface TypedActionNoPayload {
    type: string;
}
