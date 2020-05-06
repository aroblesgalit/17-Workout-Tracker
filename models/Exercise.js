// Require mongoose
const mongoose = require("mongoose");
// Create constructor
const Schema = mongoose.Schema;

// Create Exercise schema
const ExerciseSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
});
// Create Exercise model
const Exercise = mongoose.model("Exercise", ExerciseSchema);
// Export Exercise
module.exports = Exercise;