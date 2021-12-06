const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reactions');

const ThoughtSchema = new Scehma({
    writtenBy: {
        type: String,
        required: true,
        minLength: 1,
        MaxLength: 100
    },
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

    reactions: [reactionsSchema],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;
