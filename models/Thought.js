const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reactions');

const ThoughtSchema = new Schema({
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

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;
