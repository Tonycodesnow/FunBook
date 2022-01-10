const { Schema, model } = require('mongoose');
const ReactionsSchema = require('./Reactions');

const ThoughtSchema = new Schema({
    thoughtBody: {
        type: String,
        required: true,
        minLength: 1,
        MaxLength: 200
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String,
        required: 'username is required',
    },
   // Reactions: [reactionsSchema],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.Reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
