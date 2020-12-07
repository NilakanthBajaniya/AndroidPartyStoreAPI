const mongoose = require("mongoose");

const dbUri ='mongodb+srv://NilkanthB:nil96625@cluster0.fpcu0.mongodb.net/PartyStore?retryWrites=true&w=majority';
  //"mongodb+srv://Prawin:Praveen1@cluster0.ezvgx.mongodb.net/test";

mongoose.connect(dbUri, { dbName: "PartyStore" });
//check connection
mongoose.connection.on("connected", function () {
  console.log("Mongoose db connected : ", dbUri);
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});
//connection close
var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};
process.once("SIGUSR2", function () {
  gracefulShutdown("nodemon restart", function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
process.on("SIGINT", function () {
  gracefulShutdown("app termination", function () {
    process.exit(0);
  });
});
require("./user");
require("./inventory");
