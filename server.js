const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// API route - get /api/workouts
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// HTML route - /exercise
app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});


// API route - post /api/workouts
app.post("/api/workouts", (req, res) => {
    req.body.day = Date.now();
    
    db.Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// API route - put /api/workouts/:id
app.put("/api/workouts/:id", (req, res) => {
    // console.log(req.body);
    db.Workout.update({
        _id: req.params.id
    }, 
    { 
        $push: { 
            exercises: req.body 
        },
        $inc: {
            totalDuration: req.body.duration
        }
    }, 
    {
        new: true
    })
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.json(err);
        })
});

// HTML route - /stats
app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// API route - /api/workouts/range
app.get("/api/workouts/range", function(req, res) {
    // Function to get the date for Sunday of this week
    function getSunday(d) {
        const day = d.getDay();
        const diff = d.getDate() - day + (day == 0 ? -6 : 0);
        return new Date(d.setDate(diff));
      }
    
    db.Workout.find({
        day: {
            $gt: getSunday(new Date())
        }
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
