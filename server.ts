import * as express from "express";

const app = express();
const port = 3000;

app.use("/dist", express.static("dist"));

app.get("/api/count", (req, res) => {
  res.contentType("application/json");
  const obj = {amount: 100};
  setTimeout(() => res.json(obj), 500);
  //res.status(400).json(obj); //for error testing
});

app.get("*", (req, res) => {
  res.status(200).send(renderFullPage());
});

app.listen(port, (error: Error) => {
  if (error) {
    console.log(error);
  }
  console.log("server start at port 3000");
});

/**
 * 初期表示用のHTMLを返す
 *
 * @todo 後で別のファイルに分割する
 * @returns {string}
 */
const renderFullPage = () => {
  const initialState = {
    num: 99,
    loadingCount: 0,
  };

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>SPA-Prototype-React</title>
</head>
<body>
  <div id="app"></div>
  <script>
    var INITIAL_STATE = ${initialState};
  </script>
  <script src="./dist/bundle.js"></script>
</body>
</html>
  `;
};
