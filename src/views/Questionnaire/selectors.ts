import { createSelector } from 'reselect';
import { Store } from '../../generic/types';

export const selectQuestionnaire = (state: Store) => state.questionnaire;

export const selectMessage = createSelector(
    selectQuestionnaire,
    Questionnaire => Questionnaire.message
);

export const selectColors = createSelector(
    selectQuestionnaire,
    Questionnaire => Questionnaire.colors
);

export const selectHashtags = createSelector(
    selectQuestionnaire,
    Questionnaire => Questionnaire.hashtags
);

export const selectI18n = createSelector(
    selectQuestionnaire,
    Questionnaire => Questionnaire.i18n
);

export const selectImportance = createSelector(
    selectQuestionnaire,
    Questionnaire => Questionnaire.importance
);

export const selectServerError = createSelector(
    selectQuestionnaire,
    Questionnaire => Questionnaire.serverError
);

export const selectSucces = createSelector(
    selectQuestionnaire,
    Questionnaire => Questionnaire.success
);