const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

router.get("/api", (req, res) => {
    Ninja.aggregate().near({
        type: "Point",
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
    }).then((ninjas) => res.send(Object.entries(ninjas)))
        .catch(err => console.log(err));
});
router.post("/api", (req, res, next) => {
    Ninja.create(req.body)
        .then((ninja) => {
            res.send(ninja);
        }).catch(next);
});
router.put("/api/:id", (req, res) => {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Ninja.findOne({ _id: req.params.id }).then((ninja) => {
            res.send(ninja)
        });
    });
});
router.delete("/api/:id", (req, res) => {
    Ninja.findByIdAndRemove({ _id: req.params.id })
        .then((ninja) => {
            res.send(ninja);
        }).catch((err) => {
            console.log(err);
        });
});


module.exports = router;