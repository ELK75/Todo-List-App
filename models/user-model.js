
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    todos: Array
});

const User = mongoose.model('user', userSchema);

module.exports = User;