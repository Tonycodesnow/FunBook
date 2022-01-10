const { Thought, User, Reactions } = require("../models");

const thoughtController = {
  // GET /thoughts
  getAllThoughts: (req, res) => {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => console.log(err));
  },

  // get thought by id
  getThoughtById: (req, res) => {
    Thought.findOne({ _id: req.params.id })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => console.log(err));
  },

  // add a thought to a post
  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then((addThought) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: addThought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  }, // end of addThoughts

  // remove a thought from a post
  removeThoughts: ({ params, body }, res) => {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({
            message: "Thought not found",
          });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: deletedThought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  }, // end removeThoughts

  // add a reaction to a thought
  addReaction: ({ params, body }, res) => {
    console.log(body);
    Reactions.create(body) // create a reaction
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: _id } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({
            message: "Thought not found",
          });
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  }, // end of addReaction

  updateThought: ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts found with this id!" });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove a reaction from a thought
  removeReaction: ({ params, body }, res) => {
    Reactions.findOneAndDelete({ _id: params.reactionId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res.status(404).json({
            message: "Reaction not found",
          });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: deletedReaction._id } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({
            message: "Thought not found",
          });
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  }, // end of removeReaction
};

module.exports = thoughtController;
