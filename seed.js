require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/beat');

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

  process.exit();

})();