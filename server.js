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

//CORS
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

//REMOVE THIS LINE
// app.options('*', cors());

app.use(cookieParser())
app.use(exp.json())

app.use("/user-api", userApp)
app.use("/author-api", authorApp)
app.use("/admin-api", adminApp)
app.use("/auth-api", commonApp)

const port = process.env.PORT || 5000

const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB connected");

    app.listen(port, () => console.log(`server listening on ${port}..`));
  } catch (err) {
    console.log("err in db connect", err)
  }
}
connectDB()

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `path ${req.url} is invalid` })
})

// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: "error occured", error: err.message })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: "error occured", error: err.message })
  }
  res.status(500).json({ message: "error occured", error: err.message })
})