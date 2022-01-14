const express = require('express');
const router = express.Router();
const Driver = require('../models/driver')

//get a list of drivers from the db
router.get('/driver',(req,res,next) => {
    // Driver.find({}).then((drivers)=> {

    // })
    // console.log(req.query);
    // const lat = req.query.lat;
    // const lng = req.query.lng;
    // console.log(lat,lng);
    console.log(req.query)
    Driver.aggregate([
        {
          $geoNear: {
             //near: { "type": "Point", "coordinates": [-4.4657183, 48.38249] },
             //near: { type: "Point", coordinates: [ parseFloat(req.query.lng) , parseFloat(req.query.lat) ] },
             //near: { type: "Point", coordinates: [ parseFloat(req.body.longitude),parseFloat(req.body.latitude) ] },
             near: { type: "Point", coordinates: [ parseFloat(req.query.longitude) , parseFloat(req.query.latitude) ] },
             distanceField: "dist.calculated",
             maxDistance: 1000000,
             spherical: true
          }
        }
     ]).then((drivers) => {
         //res.send(drivers);
         res.render('drivers',{drivers:drivers});
     }).catch(next);
})

//adding new driver to the database
router.post('/driver',(req,res,next) => {
    console.log(req.body);
    Driver.create(req.body).then((driver) => {
        res.send(driver);
    }).catch(next);
});

//update a driver in the db
router.put('/driver/:id',(req,res,next) => {
    Driver.findByIdAndUpdate({_id: req.params.id},req.body).then((driver)=> {
        Driver.findOne({_id: req.params.id}).then((driver) => {
            res.send(driver);
        })
    })
    //res.send({type: 'PUT'});
})

//delete the driver from the database
router.delete('/driver/:id',(req,res,next) => {
    //console.log(req.params.id);
    Driver.findByIdAndDelete({_id: req.params.id}).then((driver)=> {
        res.send(driver);
    });
    //res.send({type: 'DELETE'});
})

module.exports = router;
