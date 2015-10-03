var mongoose = require('mongoose');

var TrajetSchema = new mongoose.Schema({
	villeDepart: String,
	villeArrivee: String,
	date: String,
	nbPlaces: Number,
	idUtilisateur: String
});

module.exports = mongoose.model('Trajet', TrajetSchema);
