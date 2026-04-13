import exp from 'express'
import { userModel } from '../Models/userModel.js'
import { verifyToken } from '../middleware/verifyToken.js'

export const adminApp = exp.Router()

// Get all USERS (only emails)
adminApp.get("/users", verifyToken("ADMIN"), async (req, res) => {
  try {
    const users = await userModel.find({ role: "USER" }, { email: 1, _id: 1 })
    res.status(200).json({ message: "users", payload: users })
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message })
  }
})

// Get all AUTHORS (only emails)
adminApp.get("/authors", verifyToken("ADMIN"), async (req, res) => {
  try {
    const authors = await userModel.find({ role: "AUTHOR" }, { email: 1, _id: 1 })
    res.status(200).json({ message: "authors", payload: authors })
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message })
  }
})


// Block USER
adminApp.put("/user/block/:id", verifyToken("ADMIN"), async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { isUserActive: false },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    res.status(200).json({ message: "user blocked", payload: user })
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message })
  }
})


//Activate USER
adminApp.put("/user/activate/:id", verifyToken("ADMIN"), async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { isUserActive: true },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    res.status(200).json({ message: "user activated", payload: user })
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message })
  }
})


// Block AUTHOR
adminApp.put("/author/block/:id", verifyToken("ADMIN"), async (req, res) => {
  try {
    const author = await userModel.findOneAndUpdate(
      { _id: req.params.id, role: "AUTHOR" },
      { isUserActive: false },
      { new: true }
    )

    if (!author) {
      return res.status(404).json({ message: "author not found" })
    }

    res.status(200).json({ message: "author blocked", payload: author })
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message })
  }
})


// Activate AUTHOR
adminApp.put("/author/activate/:id", verifyToken("ADMIN"), async (req, res) => {
  try {
    const author = await userModel.findOneAndUpdate(
      { _id: req.params.id, role: "AUTHOR" },
      { isUserActive: true },
      { new: true }
    )

    if (!author) {
      return res.status(404).json({ message: "author not found" })
    }

    res.status(200).json({ message: "author activated", payload: author })
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message })
  }
})
