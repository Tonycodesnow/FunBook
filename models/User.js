const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: 'A user name is required'
    },
    email: {
        type: String,
        required: 'email is required',
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email'],
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
});

    UserSchema.virtual('friendCount').get(function () {
        return this.friends.length;
    });

const User = model('User', UserSchema);

module.exports = User;