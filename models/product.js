var mongoose = require('mongoose');

//Product Schema

var ProductSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	name: {
		type: String
	},
	description: {
		type: String
	},
	price: {
		type: Number
	}
});


var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
