# serverless-todo-app-web
Serverless Architectures TODO Web Application

## 事前準備

プロジェクトルートに `.env` ファイルを作成して下さい。

内容は以下のように記載します。

```
APP_URI={{ APP_URL }}
TODO_APP_BACKEND_BASE_URI={{ TODO_APP_BACKEND_BASE_URI }}
COGNITO_USER_POOL_ID={{ COGNITO_USER_POOL_ID }}
COGNITO_USER_POOL_CLIENT_ID={{ COGNITO_USER_POOL_CLIENT_ID }}
```

- APP_URI
    - 本アプリケーションが起動する際のURIを記載します。
- TODO_APP_BACKEND_BASE_URI
    - [serverless-todo-app-backend](https://github.com/keita-nishimoto/serverless-todo-app-backend) のURIを記載します。
- COGNITO_USER_POOL_ID
    - 作成した Amazon Cognito User PoolsのIDを記載します。
- COGNITO_USER_POOL_CLIENT_ID
    - Amazon Cognito User Poolsに紐づく本アプリケーション用のアプリクライアントIDを記載します。
