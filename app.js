const express = require('express');
const app = express()
const router = require('./routers/index');
const session = require('express-session')
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    sameSite: true,
    expires: new Date(Date.now() + 3600000),
    maxAge: 3600000
  }
}))

app.use("/", router)

app.listen(port, () => {
  console.log("Listening on port ", port);
})