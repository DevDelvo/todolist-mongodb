const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

const db = mongojs(
    "mongodb://arjunaraneta123:arjunaraneta123@ds119732.mlab.com:19732/mongotask",
    ["tasks"]
);

// Get All Tasks
router.get("/tasks", (req, res, next) => {
    db.tasks.find({}, { _id: 1, title: 1 }, (err, tasks) => {
        if (err) {
            res.send(err);
        }
        const data = [];
        Object.keys(tasks).forEach((key) => {
            const val = tasks[key];
            data.push([val.title, val._id]);
        });
        // res.json(tasks);
        // res.send(tasks);
        res.send(data);
    });
});

// Get Single Task
router.get("/task/:id", (req, res, next) => {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Save Task
router.post("/task", (req, res, next) => {
    const task = req.body;
    if (!task.title || !(task.isDone + "")) {
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    };
});

// Delete Task
router.delete("/task/:id", (req, res, next) => {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put("/task/:id", (req, res, next) => {
    const task = req.body;
    const updateTask = {};
    if (task.isDone) {
        updateTask.isDone = task.isDone;
    }
    if (task.title) {
        updateTask.title = task.title;
    }

    if (!updateTask) {
        res.status(400);
        res.json({ error: "Bad Data"});
    } else {
        db.tasks.update(
            { _id: mongojs.ObjectId(req.params.id) },
            updateTask,
            {},
            (err, tast) => {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            }
        );
    }
});

module.exports = router;