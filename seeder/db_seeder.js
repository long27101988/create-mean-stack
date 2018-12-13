const user = require('./user_seeder');
const post = require('./post_seeder');

async function dbseed() {
    await user();
    await post();
    console.log('data generate successfull');
}
