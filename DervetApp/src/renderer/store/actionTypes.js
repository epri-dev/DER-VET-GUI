// Global
export const RESET_ALL = 'resetAll';

// Shared
export const RESET = 'reset';

// Aplication actions
export const KILL_PYTHON = 'killPython';
export const MERGE_PAGE_STATUS = 'mergePageStatus';
export const RECEIVE_ERROR = 'receiveError';
export const REMOVE_COLLECTION_PAGE_STATUS = 'removeCollectionPageStatus';
export const REMOVE_ALL_COLLECTION_PAGE_STATUS = 'removeAllCollectionPageStatus';
export const RUN_DERVET = 'runDervet';
export const SET_PAGE_STATUS = 'setPageStatus';
export const SET_DEFAULT_PAGE_STATUS = 'setDefaultPageStatus';
export const SET_MANY_COLLECTION_PAGE_STATUS = 'setManyCollectionPageStatus';
export const SET_NEW_APPLICATION_STATE = 'setNewApplicationState';

// OpenEI
export const LOAD_UTILITIES = 'loadUtilities';
export const SET_API_KEY = 'setApiKey';

// CalEnviroScreen
export const RESET_ZIP_CODE = 'resetZipCode';

// Results
export const RECEIVE_RESULTS = 'receiveResults';

// Project
// index page
export const RESET_PROJECT = 'resetProject';
export const LOAD_NEW_PROJECT = 'loadNewProject';
export const RESET_VALUES_TO_DEFAULT = 'resetValuesToDefault';
export const SET_VALUES = 'setValues';
export const ADD_COLLECTION_ITEM = 'addCollectionItem';
export const REPLACE_COLLECTION_ITEM = 'replaceCollectionItem';
export const REMOVE_COLLECTION_ITEM = 'removeCollectionItem';
export const REMOVE_ALL_COLLECTION_ITEMS = 'removeAllCollectionItems';
export const ADD_MANY_COLLECTION_ITEMS = 'addManyCollectionItems';
export const VALIDATE_PROJECT_AND_SET_ERRORS = 'validateProjectAndSetErrors';

// technology spec page
export const ACTIVATE_TECH = 'activateTech';
export const DEACTIVATE_TECH = 'deactivateTech';
export const RESET_GAMMA_AND_NU = 'resetGammaAndNu';

export const ACTIONS_THAT_TRIGGER_VALIDATION = [
  SET_VALUES,
  ADD_COLLECTION_ITEM,
  ADD_MANY_COLLECTION_ITEMS,
  REMOVE_COLLECTION_ITEM,
  REMOVE_ALL_COLLECTION_ITEMS,
  REPLACE_COLLECTION_ITEM,
  ACTIVATE_TECH,
  DEACTIVATE_TECH,
  RESET_GAMMA_AND_NU,
];
