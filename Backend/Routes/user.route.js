const express = require("express");
const userRouter = express.Router();
const userModal = require("../Modal/user_modal");
const jwt = require("jsonwebtoken");
const songModal = require("../Modal/Song_modal");

userRouter.post("/login", async (req, res) => {
  {
    const { email, password } = req.body;
    const user = await userModal.findOne({ email: email });

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      res.cookie("token", token, {
        httpOnly: true,
      });
      password === user.password
        ? res.status(200).json({ message: "Login Sucessfull" })
        : res.status(401).json({ message: "Invalid Credentials" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
});

userRouter.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await userModal.findById(decoded_token.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ email: user.email });
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.json({ message: "Logged out successfully" });
});

userRouter.delete("/delete_song/:id", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const song = req.params.id;
  const deltedSong = await userModal.findOneAndUpdate(
    { _id: jwt.verify(token, process.env.JWT_SECRET_KEY).id },
    {
      $pull: { songs: song },
    }
  );
  if (!deltedSong) {
    return res.status(404).json({ message: "Song not found" });
  }
  res.json({ message: "Song deleted successfully" });
});

userRouter.get("/userSongs", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const data = await userModal
    .findById({ _id: jwt.verify(token, process.env.JWT_SECRET_KEY).id })
    .populate("songs");
  res.json(data.songs);
});
module.exports = userRouter;
