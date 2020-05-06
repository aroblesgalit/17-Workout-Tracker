// Require mongoose
const mongoose = require("mongoose");
// Create constructor
const Schema = mongoose.Schema;

// Create Exercise schema
const ExerciseSchema = new Schema({
    type: String,
    name: String,
    duration: number,
    weight: number,
    reps: number,
    sets: number,
    distance: number
});
// Create Exercise model
const Exercise = mongoose.model("Exercise", ExerciseSchema);
// Export Exercise
module.exports = Exercise;