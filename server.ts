import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as bodyParser from "body-parser";

const app = express();
const port = 3000;
const TODO_LIST_JSON = path.join(__dirname, 'todo.json');

app.use("/dist", express.static("dist"));
app.use(bodyParser.json());

app.get("/api/count", (req, res) => {
  res.contentType("application/json");
  const obj = {amount: 100};
  setTimeout(() => res.json(obj), 500);
  //res.status(400).json(obj); //for error testing
});

app.post("/api/todo", (req, res) => {

  fs.readFile(TODO_LIST_JSON, (error, buffer) => {
    res.contentType("application/json");

    const todo = JSON.parse(buffer.toString());

    if (error) {
      res.status(500).json(
        {"message": "500 Internal Server Error"}
      );
      return;
    }

    const addTodo = {
      id: Date.now(),
      title: req.body.title
    };

    todo.push(addTodo);
    fs.writeFile(TODO_LIST_JSON, JSON.stringify(todo, null, 2), (error) => {
      if (error) {
        res.status(500).json(
          {"message": "500 Internal Server Error"}
        );
      }

      setTimeout(() => res.status(201).json(todo), 500);
      return;
    });
  });
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
