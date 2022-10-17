import { createAction } from '@reduxjs/toolkit';

const Action = {
  SET_REVIEW_MODAL_OPENING_STATUS: 'SET_REVIEW_MODAL_OPENING_STATUS',
  SET_REVIEW_ERROR_STATUS: 'SET_REVIEW_ERROR_STATUS',
  SET_REVIEW_SUCCESS_OPENING_STATUS: 'SET_REVIEW_SUCCESs_OPENING_STATUS'
};

// const redirectToRoute = createAction(Action.REDIRECT_TO_ROUTE, (value) => (
//   {
//     payload: value,
//   }));

const setModalOpeningStatus = createAction(Action.SET_REVIEW_MODAL_OPENING_STATUS, (value : boolean) => (
  {
    payload: value,
  }));

const setReviewErrorStatus = createAction(Action.SET_REVIEW_ERROR_STATUS, (value : boolean) => (
  {
    payload: value,
  }));

const setSuccessOpeningStatus = createAction(Action.SET_REVIEW_SUCCESS_OPENING_STATUS, (value : boolean) => (
  {
    payload: value,
  }));

export {
  Action,
  //   redirectToRoute,
  setModalOpeningStatus,
  setReviewErrorStatus,
  setSuccessOpeningStatus
};
