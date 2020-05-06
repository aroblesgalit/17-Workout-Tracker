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
    var prevSun = new Date();
    prevSun.setHours(0,0,0,0);
    prevSun.setDate(prevSun.getDate() - (prevSun.getDay()) % 7);  
    db.Workout.find({
        day: {
            $gt: prevSun
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
