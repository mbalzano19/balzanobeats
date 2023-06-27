const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose (for populating Menu Item queries)
require('./category');

const beatSchema = require('./beatSchema');

module.exports = mongoose.model('Beat', beatSchema);