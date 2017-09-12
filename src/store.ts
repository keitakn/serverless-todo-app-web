import { Action, combineReducers, createStore } from 'redux';
import signup, { ISignupState, SignupActions } from './pages/signup/module';
import todo, { ITodoState, TodoActions } from './pages/todo/module';

export default createStore(
  combineReducers({
    todo,
    signup,
  }),
);

export interface IReduxState {
  todo: ITodoState;
  signup: ISignupState;
}

export type ReduxAction = TodoActions | SignupActions | Action;
