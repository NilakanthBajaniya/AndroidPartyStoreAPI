var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 1 },
  role: { type: String, required: true, minlength: 4 },
  email: { type: String, required: true, minlength: 6 },
  password: {type: String, required: true, minlength: 6}
});
mongoose.model("users", userSchema);