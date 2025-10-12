const express = require('express');

const app = express();

const PORT = 3000;

const startApp = async () => {
  app.use(express.json());
  app.listen(PORT, (err) => {
    if (!err) {
      console.log("Starting Server");
    } else {
      console.log(err);
    }
  });
};

startApp()
  .then(() => {
    console.log(`Server listening at http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.log("Server Start Error");
    console.log(err);
  });

module.exports = app;