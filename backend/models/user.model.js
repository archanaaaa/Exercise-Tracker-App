const mongoose = require('mongoose');
const schema = mongoose.schema;

const userSchema = new schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema)