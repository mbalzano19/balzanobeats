require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Beat = require('./models/beat');

// IIFE
// Immediately Invoked Function Expression
(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Hip Hop', sortOrder: 10},
    {name: 'Trap', sortOrder: 20},
    {name: 'Rnb', sortOrder: 30},
    {name: 'Pop', sortOrder: 40},
    {name: 'House', sortOrder: 50},
    {name: 'DnB', sortOrder: 60},
    {name: 'Afro', sortOrder: 70},
    {name: 'Ambient', sortOrder: 80},
  ]);

  await Beat.deleteMany({});
  const beats = await Beat.create([
    {name: 'Squad', genre: 'Drill', tempo: 140, key: 'A minor', description: 'up-tempo drill beat', price: 49, url: 'https://balzanobeats.s3.amazonaws.com/beats/squad2.mp3', coverArt: 'https://balzanobeats.s3.amazonaws.com/cover-art/InTheRoom.png', category: categories[0]},
    // {name: 'Let Go', genre: 'Drill', tempo: 148, key: 'B minor', description: 'emotional drill beat', price: 49, category: categories[1]},
    // {name: 'React', genre: 'Hip Hop', tempo: 140, key: 'A minor', description: 'banger.', price: 49, url: 'https://balzanobeats.s3.amazonaws.com/react.mp3', category: categories[1]},
    {name: 'yourownway', genre: 'Hip Hop', tempo: 140, key: 'B minor', description: 'Emotional hip hop beat featuring soft piano and hard hitting drums', price: 49, url: 'https://balzanobeats.s3.amazonaws.com/beats/yourownway+(b+minor)+140.mp3', coverArt: 'https://balzanobeats.s3.amazonaws.com/cover-art/yourownway.png', category: categories[0]},
    {name: 'Secrets', genre: 'Hip Hop/Pop', tempo: 156, key: 'Ab major', description: 'Secrets is a pop-style up tempo beat with hip hop inspired drums. Perfect for reminiscing about what could have been.', price: 49, url: 'https://balzanobeats.s3.amazonaws.com/beats/Secrets+(156+G%23%3AAb+Major).mp3', coverArt: 'https://balzanobeats.s3.amazonaws.com/cover-art/royspeak.png', category: categories[3]},
  ]);

  process.exit();

})();