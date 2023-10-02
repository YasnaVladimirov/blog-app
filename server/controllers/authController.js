const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function register(req, res) {
  const maleImg = 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png';
  const femaleImg = 'https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png';

  try {
    const { username, email, password, gender } = req.body;

    if (!username || !email || !password || !gender) {
      return res.status(400).json({ error: "Invalid or missing data!" });
    }

    const foundUser = await models.User.findOne({
      where: {
        username: username,
        email: email,
      }
    });

    if (foundUser) {
      return res.status(409).json({ error: "User with these credentials already exists!" });
    }

    let userImg;
    gender === "male" ? userImg = maleImg : userImg = femaleImg;

    const hashPass = await bcrypt.hash(password, 10);

    const newUSer = await models.User.create({
      username: username,
      password: hashPass,
      email: email,
      img: userImg
    });

    res.status(200).json({ message: "User created successfully", user: newUSer });
  } catch (error) {
    console.log("Error registering user: " + error);
    res.status(500).json({ error: "Error registering user: " + error });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Invalid or missing data!" });

    const foundUser = await models.User.findOne({ where: { email } });
    if (!foundUser) return res.status(400).json({ error: "User not found!" });

    const matchPass = await bcrypt.compare(password, foundUser.password);
    if (!matchPass) return res.status(400).json({ error: "Invalid password" });

    const accessToken = jwt.sign({ id: foundUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      message: "Login successfully", user: {
        id: foundUser.id,
        username: foundUser.username,
        userImg: foundUser.img
      }
    });

  } catch (error) {
    console.log("Error logging user: " + error);
    res.status(500).json({ error: "Error logging user: " + error });
  }
}

async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies) return res.status(200).json({ message: "No cookies" });;

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
    
    res.status(200).json({ message: "Logout successfully!" });

  } catch (error) {
    console.log("Error logging out user: " + error);
    res.status(500).json({ error: "Error logging out user: " + error });
  }
}

module.exports = {
  register,
  login,
  logout
}
