const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const postSchema = new Schema({
    //userId: Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
});

module.exports = mongoose.model('Post', postSchema);