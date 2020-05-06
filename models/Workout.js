// Require mongoose
const mongoose = require("mongoose");
// Create constructor
const Schema = mongoose.Schema;

// Create Workout schema
const WorkoutSchema = new Schema({
    day: Date,
    exercises: [
        // {
        //     type: String,
        //     name: String,
        //     duration: Number,
        //     weight: Number,
        //     reps: Number,
        //     sets: Number,
        //     distance: Number
        // }
    ],
    totalDuration: {
        type: Number,
        default: 0
    }
});


// Create Workout model
const Workout = mongoose.model("Workout", WorkoutSchema);
// Workout Exercise
module.exports = Workout;