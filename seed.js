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
    {name: 'Squad', genre: 'Drill', tempo: 140, key: 'A minor', description: 'up-tempo drill beat', price: 49.99, category: categories[0]},
    {name: 'Let Go', genre: 'Drill', tempo: 148, key: 'B minor', description: 'emotional drill beat', price: 49.99, category: categories[1]},
  ]);

  process.exit();

})();