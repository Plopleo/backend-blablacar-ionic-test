var mongoose = require('mongoose');
var Trajet = require('../models/Trajet.js');

exports.findAll = function (req, res, next) {
    var villeDepart = req.query.villeDepart;
    var villeArrivee = req.query.villeArrivee;
    var date = req.query.date;


    if(villeDepart && villeArrivee) {
        if(!isNaN(date)){
            var dateMax = parseInt(date) + 24*60*60; // search date + 1 day
            //regex --> case insensitive
            Trajet.find({ 'villeDepart': { $regex: new RegExp("^" + villeDepart.toLowerCase(), "i") }, 
                            'villeArrivee': { $regex: new RegExp("^" + villeArrivee.toLowerCase(), "i") },
                            'date': {$gt : date, $lt : dateMax} }, function (err, trajets) {
                if (!err){ 
                    console.log(trajets);
                    res.send(trajets);
                } else {
                    throw err;
                }
            });
        } else {
            //regex --> case insensitive
            Trajet.find({ 'villeDepart': { $regex: new RegExp("^" + villeDepart.toLowerCase(), "i") }, 'villeArrivee': { $regex: new RegExp("^" + villeArrivee.toLowerCase(), "i") } }, function (err, trajets) {
                if (!err){ 
                    console.log(trajets);
                    res.send(trajets);
                } else {
                    throw err;
                }
            });
        }
    } else {
        Trajet.find({}, {}, {    
            sort:{
                date: 1 //Sort by Date Added ASC
            }
        },function (err, trajets) {
            if (!err){ 
                res.send(trajets);
            } else {
                throw err;
            }
        });
    }
};

exports.findById = function (req, res, next) {
    Trajet.findOne({'_id': req.params.id}, function (err, trajet) {
        if (err) {
         console.log(err.name);
         return;
        }
        if (!trajet){
           
        } else {           
            res.send(trajet);
            return;
        }
    }); 
};

exports.createTrajet = function (req, res, next) {
    var newTrajet = new Trajet({
        villeDepart: req.body.villeDepart,
        villeArrivee: req.body.villeArrivee,
        date: req.body.date,
        nbPlaces : req.body.nbPlaces
    });
    newTrajet.save();
    res.send("Votre trajet a bien été crée");
};