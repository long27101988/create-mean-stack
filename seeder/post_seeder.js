const seeder = require('mongoose-seed');
const faker = require('faker');
const config = require('../config')
const dataArticle = require('../data.json');
let items = dataArticle;
for (i = 0; i < 8; i++) {
    items[i].picture = faker.image.food()
    items[i].content = faker.lorem.paragraphs()
}

let data = [{
    'model': 'Article',
    'documents': items
}]

// connect mongodb
seeder.connect(config.dbConnectionString, function() {
  seeder.loadModels([
    './models/article'  // load mongoose model 
  ]);
  seeder.clearModels(['Article'], function () {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});

module.exports = seeder;