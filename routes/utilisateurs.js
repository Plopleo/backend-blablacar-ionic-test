var mongoose = require('mongoose');
var Utilisateur = require('../models/Utilisateur.js');

exports.createUser = function (req, res, next) {
	Utilisateur.findOne({'mail': req.body.mail}, function (err, user) {
        if (err) {
         console.log(err.name);
         return;
        }
        if (!user){
        	var newUser = new Utilisateur({
        		nom: req.body.nom,
        		prenom: req.body.prenom,
        		mail: req.body.mail,
        		password: req.body.password
        	});
        	newUser.save();
        	res.send("Votre compte a bien été crée, vous pouvez vous connecter.");
        } else {           
            res.send("Cet email est déjà utilisé...");
            return;
        }
    });    
};

exports.findUserByMailAndPassword = function (req, res, next) {
    Utilisateur.findOne({'mail': req.query.mail, 'password': req.query.password}, function (err, user) {
        if (err) {
         console.log(err.name);
         return;
        }
        if (!user){
        	res.send("Erreur dans les identifiants");
        } else {           
            res.send(user);
            return;
        }
    });
};