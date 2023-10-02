const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./models");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));


const authRouter = require('./routes/authRoutes');
app.use("/", authRouter);
const userRouter = require('./routes/userRoutes');
app.use("/", userRouter);
const postRouter = require('./routes/postRoutes');
app.use("/posts", postRouter);

const PORT = process.env.PORT || 8000;
db.sequelize.sync().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.log("Error runngin server, ", err);
})
