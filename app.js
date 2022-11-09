const express = require('express');
const Controller = require('./controllers/controller');
const app = express()
const router = require('./routers');

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.get("/", Controller.getLogin)

app.listen(3000, () => {
  console.log("Listening on port 3000");
})