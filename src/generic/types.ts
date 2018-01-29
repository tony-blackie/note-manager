import { EditNoteState } from "../views/EditNote/types";
import { AppComponentState } from "../views/App/types";
import { EditHashtagState } from "../views/EditHashtag/types";
import { LoginState } from "../views/Login/types";
import { CheckInState } from "../views/CheckIn/types";
import { QuestionnaireState } from "../views/Questionnaire/types";

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
  parent: number;
  name: string;
  text: string;
  date: string;
}

export interface HashtagType {
  id: number;
  parent: number;
  name: string;
  notes: number[];
  isRoot: boolean;
  isActive?: boolean;
  isOpen?: boolean;
}

export interface HashtagTypeAPI {
  id: number;
  parent: number;
  name: string;
  notes: number[];
  is_root: boolean;
}

export interface TypedAction<payload> {
  type: string;
  payload?: payload;
}

export interface TypedActionNoPayload {
  type: string;
}
