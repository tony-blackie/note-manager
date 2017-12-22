import { createSelector } from 'reselect';
import { Store } from '../../generic/types';

export const selectQuestionnaire = (state: Store) => state.questionnaire;

export const selectMessage = createSelector(
    selectQuestionnaire,
    Questionnaire => Questionnaire.message
);
