import { Action, combineReducers, createStore } from 'redux';
import signup, { ISignupState, SignupActions } from './pages/signup/module';
import todo, { ITodoState, TodoActions } from './pages/todo/module';
import login, { ILoginState, LoginActions } from './pages/login/module';

export default createStore(
  combineReducers({
    todo,
    signup,
    login,
  }),
);

export interface IReduxState {
  todo: ITodoState;
  signup: ISignupState;
  login: ILoginState;
}

export type ReduxAction = TodoActions | SignupActions | LoginActions |Action;
