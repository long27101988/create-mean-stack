const seeder = require('mongoose-seed');
const faker = require('faker');
const config = require('../config')
const crypto = require('crypto')

let salt = crypto.randomBytes(16).toString('hex');
let password = crypto.pbkdf2Sync("12345678", salt, 1000, 64, 'sha1').toString('hex');

let items = [{
    name: "admin",
    email: "admin@test.com",
    salt: salt,
    password: password,
    date: new Date()
}];

let data = [{
    'model': 'User',
    'documents': items
}]

// connect mongodb
seeder.connect(config.dbConnectionString, function () {
    seeder.loadModels([
        './models/user' // load mongoose model 
    ]);
    seeder.clearModels(['User'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});

module.exports = seeder;