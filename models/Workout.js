// Require mongoose
const mongoose = require("mongoose");
// Create constructor
const Schema = mongoose.Schema;

// Create Workout schema
const WorkoutSchema = new Schema({
    day: Date,
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ]
});
// Create Workout model
const Workout = mongoose.model("Workout", WorkoutSchema);
// Workout Exercise
module.exports = Workout;