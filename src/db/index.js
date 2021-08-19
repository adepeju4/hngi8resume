const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connection.on("connected", () => {
  console.log("Database connected");
});

mongoose.connection.on("disconnected", error => {
  console.warn(`lost database connection`);
});

mongoose.connection.on("reconnect", () => {
   console.log("-> database reconnected");
});

mongoose.connection.on("error", error => {
  console.error(`Could not connect because of ${error}`);
  process.exit(-1);
});

startDb = () => {
  mongoose.connect(process.env.DB, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

module.exports = startDb;