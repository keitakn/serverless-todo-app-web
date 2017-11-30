const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use('/dist', express.static('dist'));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('server start at port 3000');
});
