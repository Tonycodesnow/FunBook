const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThoughts,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Set up GET all and POST at /api/thoughts
router.route("/")
.get (getAllThoughts)
.post(addThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router.route("/:id")
.get(getThoughtById)
.put(updateThought)
.delete(removeThoughts);

router.route('/:thoughtId/reactions/')
    .post(addReaction)
    .delete(removeReaction)

module.exports = router;