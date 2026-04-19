const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const userModal = require("../Modal/user_modal");
const jwt = require("jsonwebtoken");
const albumModal = require("../Modal/Album_modal");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { uploadImageToI_KIT } = require("../Services/Song.services");

const upload = multer({ storage: multer.memoryStorage() });

const authCookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

userRouter.post("/register", async (req, res) => {
  const { artistName, stageName, genre, bio, email, password } = req.body;

  if (!artistName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Artist name, email and password are required" });
  }

  try {
    const existingUser = await userModal.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Artist already exists with this email" });
    }

 
    const user = await userModal.create({
      artistName : artistName.toUpperCase(),
      stageName : stageName.toUpperCase(),
      genre,
      bio,
      email,
      password : await bcrypt.hash(password, 10),
    });
     
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token, authCookieOptions);

    return res.status(201).json({
      message: "Artist registered successfully",
      user: {
        id: user.id,
        artistName: user.artistName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Error" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password) !== true) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token, authCookieOptions);

    return res.status(200).json({
      message: "Login Sucessfull",
      user: {
        id: user.id,
        artistName: user.artistName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Error" });
  }
});

userRouter.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await userModal.findById(decodedToken.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    email: user.email,
    artistName: user.artistName,
    stageName: user.stageName,
    genre: user.genre,
  });
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token", authCookieOptions);
  res.json({ message: "Logged out successfully" });
});

userRouter.get("/albums/totalablums", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const totalAlbums = await albumModal.countDocuments({
    artist_id: decoded.id,
  });

  res.status(200).json({ totalAlbums });
});

userRouter.get("/albums", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ message: "User not Auth!" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const limit = parseInt(req.query.limit) || 4;
  const offset = parseInt(req.query.offset) || 0;
  try {
    const content = await albumModal.aggregate([
      {
        $match: { artist_id: new mongoose.Types.ObjectId(decoded.id) },
      },
      {
        $lookup: {
          from: "songs",
          localField: "Songs",
          foreignField: "_id",
          as: "songs",
        },
      },
      {
        $match: {
          songs: { $ne: [] },
        },
      },
      {
        $skip: offset,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          albumName: 1,
          albumImg: 1,
          createdAt: 1,
          songs: {
            _id: 1,
            Title: 1,
            AudioFile: 1,
            ImageFile: 1,
          },
        },
      },
    ]);
    res.status(200).send(content);
  } catch (err) {
    res.status(500).send({ message: "Internal Error" });
  }
});

userRouter.post("/albums", upload.single("AlbumImg"), async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({ message: "not Authorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  try {
    const AlbumImage = await uploadImageToI_KIT(req.file.buffer);

    const album = await albumModal.create({
      artist_id: decoded.id,
      albumName: req.body.Title,
      Songs: req.body.AlbumSongs,
      albumImg: AlbumImage.url,
    });

    if (!album) {
      res.status(401).json({ message: "something went wrong with Album DB" });
    }
    res.status(200).json({ mesage: "sucess" });
  } catch (err) {
    console.log("Err", err);
  }
});

module.exports = userRouter;
