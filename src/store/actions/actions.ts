import * as T from '../actionTypes/actionTypes';
import * as API from '../api/api';
import {Dispatch} from 'redux';

export const setDataIsLoading = (bool: boolean) => ({
  type: T.DATA_LOADING,
  payload: bool,
});

export const setData = (data: any) => ({
  type: T.SET_DATA,
  payload: data,
});

export const showError = (error: string) => ({
  type: T.SHOW_ERROR_MESSAGE,
  payload: error,
});

export const hideError = () => ({
  type: T.HIDE_ERROR_MESSAGE,
});

export const getData = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setDataIsLoading(true));
      const {data} = await API.getListOfObjectIds();
      if (data.total >= 30) {
        const shortenedArray = data.objectIDs.slice(0, 30);

        try {
          let collectionOfResults: any[] = [];
          shortenedArray.forEach(async (objId: number, i: number) => {
            const {data: itemData} = await API.getItemWithObjectId(objId);

            collectionOfResults = [...collectionOfResults, itemData];

            if (i === shortenedArray.length - 1) {
              dispatch(setData(collectionOfResults));
            }
          });
        } catch (e) {
          showError(`Error: ${e}`);
        } finally {
          dispatch(setDataIsLoading(false));
        }
      }
    } catch (e) {
      showError(`Error: ${e}`);
      dispatch(setDataIsLoading(false));
    }
  };
};

// export const setDataWithKey = (data: any, key: string) => ({
//   type: `${T.SET_DATA}_${key} `,
//   payload: data,
// });

// export const getDataExample = (endPtFunction: () => void, key: string) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch(setDataIsLoading(true));
//       const data = await endPtFunction();

//       dispatch(setDataWithKey(data, key));
//     } catch (e) {
//       showError(`Error: ${e}`);
//     } finally {
//       dispatch(setDataIsLoading(false));
//     }
//   };
// };
