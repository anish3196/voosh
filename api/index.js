require("dotenv").config();
var path = require('path');
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { connectDB } = require("../config/db");

const userRoutes = require("../routes/userRoutes");

const authRoutes = require("../routes/authRoutes");

const albumRoutes = require("../routes/albumRoutes");

const artistRoutes = require("../routes/artistRoutes");

const trackRoutes = require("../routes/trackRoutes");

const favoriteRoutes = require("../routes/favoriteRoutes");


const { isAuth, isAdmin, isAdminOrEditor } = require("../config/auth");


connectDB();
const app = express();

app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.use(cors());


app.get("/", (req, res) => {
    res.send("App works proprly!");
});


app.use("/api/v1/users/", isAuth,userRoutes);
app.use("/api/v1/albums/", isAuth,albumRoutes);
app.use("/api/v1/tracks/", isAuth,trackRoutes);
app.use("/api/v1/artists/", isAuth, artistRoutes);
app.use("/api/v1/favorites/", isAuth,favoriteRoutes);
app.use("/api/v1/", authRoutes);

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ message: err.message });
  });
  
const PORT = process.env.PORT || 5000;
  
  // app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

