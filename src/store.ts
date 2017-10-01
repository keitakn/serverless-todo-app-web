import { Action, combineReducers, createStore } from 'redux';
import signup, { ISignupState, SignupActions } from './pages/signup/module';
import todo, { ITodoState, TodoActions } from './pages/todo/module';
import login, { ILoginState, LoginActions } from './pages/login/module';
import auth, { IAuthState, AuthActions } from './pages/auth/module';

export default createStore(
  combineReducers({
    todo,
    signup,
    login,
    auth,
  }),
);

export interface IReduxState {
  todo: ITodoState;
  signup: ISignupState;
  login: ILoginState;
  auth: IAuthState;
}

export type ReduxAction = TodoActions | SignupActions | LoginActions | AuthActions | Action;
