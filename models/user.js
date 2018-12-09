const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Schema = mongoose.Schema;

var userSchema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: String,
    salt: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
}

userSchema.methods.validPassword = function(password) {
    const passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.password = passwordHash
}


module.exports = mongoose.model('User', userSchema)