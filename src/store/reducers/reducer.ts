import {setDataIsLoading, setData, showError} from '../actions/actions';
import * as T from '../actionTypes/actionTypes';

export interface iItem {
  objectID: number;
  primaryImage: string;
  primaryImageSmall: string;
  title: string;
  department: string;
  objectName: string;
  period: string;
  artistDisplayName: string;
  objectDate: string;
}

interface iInitialState {
  data: iItem[];
  dataIsLoading: boolean;
  errorMessage: string;
}

const INITIAL_STATE: iInitialState = {
  data: [],
  dataIsLoading: false,
  errorMessage: '',
};

type Action = ReturnType<
  typeof setDataIsLoading | typeof setData | typeof showError
>;

export const reducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case T.DATA_LOADING:
      return {
        ...state,
        dataIsLoading: action.payload,
      };
    case T.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case T.SHOW_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case T.HIDE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: INITIAL_STATE.errorMessage,
      };
    default:
      return state;
  }
};
