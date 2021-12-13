
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema({

    reactionsId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId(),
    },
    reactionsBody: {
        type: String,
        required: true,
        minLength: 1,
        MaxLength: 200
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal)=> dateFormat(createdAtVal)
    },

    userName: {
        type: String,
        required: 'username is required',
    },

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
    },
    id: false
});

ReactionsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Reactions = model('Reactions', ReactionsSchema);

module.exports = Reactions;