const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    tempo: {
        type: Number,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        // default: 99
    },
    url: {
        type: String,
        default: ''
    },
    coverArt: {
        type: String,
        default: ''
    },
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
}, {
    timestamps: true
})

module.exports = beatSchema;