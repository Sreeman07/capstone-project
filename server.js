import exp from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import { userApp } from './API/userAPI.js'
import { authorApp } from './API/authorAPI.js'
import { adminApp } from './API/adminAPI.js'
import { commonApp } from './API/commonApi.js'
import cors from "cors";
import cookieParser from 'cookie-parser'

config()

const app = exp()

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-real-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(cookieParser())
app.use(exp.json())

// ROUTES
app.use("/user-api", userApp)
app.use("/author-api", authorApp)
app.use("/admin-api", adminApp)
app.use("/auth-api", commonApp)

// PORT
const port = process.env.PORT || 5000

// DB + SERVER START
connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected")

    app.listen(port, () => {
      console.log(`server listening on ${port}..`)
    })
  })
  .catch(err => console.log("err in db connect", err))

// 404
app.use((req, res) => {
  res.status(404).json({ message: `path ${req.url} is invalid` })
})

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: "error occured", error: err.message })
})