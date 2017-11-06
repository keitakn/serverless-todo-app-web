import reducer, { postSignupRequestAction } from '../../../../../src/pages/signup/module';
import { ISignupState } from '../../../../../src/pages/signup/module';

/**
 * src/pages/signup/module.ts
 * reducerのテスト
 */
describe('PagesSignupModuleReducer', () => {

  /**
   * 正常系テスト
   * サインアップのリクエストが送信された時に実行されるaction
   */
  it('testPostSignupRequestAction', () => {
    const initialState: ISignupState = {
      email: '',
      password: '',
      gender: '',
      birthdate: '1999-01-01',
      loading: false,
      signupCompleted: false,
      userConfirmed: false,
      isError: false,
      errors: {
        message: '',
      },
    };

    const request = {
      email: 'keita@gmail.com',
      password: 'password1234',
      gender: 'male',
      birthdate: '2000-01-01',
    };

    const expected = {
      email: request.email,
      password: request.password,
      gender: request.gender,
      birthdate: request.birthdate,
      loading: true,
      signupCompleted: false,
      userConfirmed: false,
      isError: false,
      errors: {
        message: '',
      },
    };

    const newState = reducer(initialState, postSignupRequestAction(request));

    expect(newState).toEqual(expected);
  });
});
