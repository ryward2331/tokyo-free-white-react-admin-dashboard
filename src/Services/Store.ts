import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import RootReducer from "./Reducers/RootReducers";
import Raven from 'raven-js';
const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
  
  const crashReporter = store => next => action => {
    try {
      return next(action)
    } catch (err) {
      console.error('Caught an exception!', err)
      Raven.captureException(err, {
        extra: {
          action,
          state: store.getState()
        }
      })
      throw err
    }
  }
export const Store = createStore(RootReducer,  composeWithDevTools(applyMiddleware(thunk, crashReporter)));

export type RootStore = ReturnType<typeof RootReducer>;

export type AppDispatch = typeof Store.dispatch;
export type ReduxState = ReturnType<typeof RootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;