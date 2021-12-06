const { Thought, User, Reaction } = require('../models');

const thoughtController = {

    // GET /thoughts
    getAllThoughts: (req, res) => {
            Thought.find({}, (err, users) => {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        },

            // get thought by id
    getThoughtsById: (req, res) => {
        Thoughts.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        }
      );
    },

    // add a thought to a post
    addThoughts({ params, body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
          })
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }
                res.json(user);
            })
            .catch(err => res.json(err));
      }, // end of addThoughts
    
      // remove a thought from a post
        removeThoughts: ({ params, body }, res) => {
            Thought.findOneAndDelete({ _id: params.thoughtId })
                .then(deletedThought => {
                    if (!deletedThought) {
                        return res.status(404).json({
                            message: 'Thought not found'
                        });
                    }
                    return User.findOneAndUpdate(
                        { _id: params.userId },
                        { $pull: { thoughts: deletedThought._id } },
                        { new: true }
                    );
                })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({
                            message: 'User not found'
                        });
                    }
                    res.json(user);
                })
                .catch(err => res.json(err));
        },  // end removeThoughts

        // add a reaction to a thought
        addReaction: ({ params, body }, res) => {
            console.log(body);
            Reactions.create(body)  // create a reaction
                .then(({ _id }) => {
                    return Thought.findOneAndUpdate(
                        { _id: params.thoughtId },
                        { $push: { reactions: _id } },
                        { new: true }
                    );
                })
                .then(thought => {
                    if (!thought) {
                        return res.status(404).json({
                            message: 'Thought not found'
                        });
                    }
                    res.json(thought);
                })
                .catch(err => res.json(err));
        }, // end of addReaction

        // remove a reaction from a thought
        removeReaction: ({ params, body }, res) => {
            Reactions.findOneAndDelete({ _id: params.reactionId })
                .then(deletedReaction => {
                    if (!deletedReaction) {
                        return res.status(404).json({
                            message: 'Reaction not found'
                        });
                    }
                    return Thought.findOneAndUpdate(
                        { _id: params.thoughtId },
                        { $pull: { reactions: deletedReaction._id } },
                        { new: true }
                    );
                })
                .then(thought => {
                    if (!thought) {
                        return res.status(404).json({
                            message: 'Thought not found'
                        });
                    }
                    res.json(thought);
                })
                .catch(err => res.json(err));
        } // end of removeReaction 
};

module.exports = thoughtController;