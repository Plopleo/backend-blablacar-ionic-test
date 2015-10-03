var mongoose = require('mongoose');

var UtilisateurSchema = new mongoose.Schema({
	nom: String,
	prenom: String,
	mail: String,
	password: String
});

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);
