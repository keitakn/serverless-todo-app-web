import * as express from "express";
import * as path from "path";

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
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, (error: Error) => {
  if (error) {
    console.log(error);
  }
  console.log("server start at port 3000");
});
