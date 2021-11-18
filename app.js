const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require("./routes/postsRoutes");

const userRouter = require("./routes/usersRoutes");

//mongodb//kevin:mypassword@mongo:27017/?authSource=admin

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("Successfully connected to the Database"))
    .catch((error) => {
      console.log(error);
      setTimeout(connectWithRetry(), 5000);
    });
};

connectWithRetry();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.enable("trust proxy");
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 300000,
    },
  })
);

app.use(express.json());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.get("/api/v1", (req, res) => {
  res.send("Hello There  Developer");
  console.log("It runned");
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
