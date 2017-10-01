import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import AppMenu from '../../components/AppMenu';
import { ActionDispatcher } from './Container';
import { IAuthState } from './module';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

/**
 * AuthProps IF
 */
export interface IAuthProps {
  value: IAuthState;
  actions: ActionDispatcher;
}

/**
 * Authの親Component
 */
export default class Auth extends React.PureComponent<IAuthProps, {}> {

  /**
   * @param props
   */
  constructor(props: IAuthProps) {
    super(props);
  }

  /**
   * 初期化処理
   * ログイン状態の確認を行う
   *
   * @returns {Promise<void>}
   */
  public async componentWillMount() {
    await this.props.actions.isLoggedIn();
  }

  /**
   * @returns {any}
   */
  public render() {
    const loggedIn = this.props.value.isLoggedIn;
    const loading  = this.props.value.loading;

    return (
      (loggedIn && loading === false) ? (
        <Route children={this.props.children} />
      ) : (
        <MuiThemeProvider>
          <div>
            <AppMenu />
            この機能を利用する為には <Link to="/login" >ログイン</Link> を行う必要があります。
            登録がまだの場合はまず <Link to="/signup" >サインアップ</Link> を行って下さい。
          </div>
        </MuiThemeProvider>
      )
    );
  }
}
