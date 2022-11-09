const express = require('express');
const app = express()
const router = require('./routers/index');
const session = require('express-session')

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    sameSite: true
  }
}))

app.use("/", router)

app.listen(3000, () => {
  console.log("Listening on port 3000");
})