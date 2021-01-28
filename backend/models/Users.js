const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	role: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	education: [
		{
			institution: {type: String},
			startYear: {type: Number},
			endYear: {type: Number}
		}
	],
	skills: {
		type: [String],
		default: []
	},
	imgUrl: { 
		type: String, 
		default: "" 
	},
	contact: {
		type: Number,
		default: 0
	},
	bio: {
		type: String,
		default: ""
	},
	rating: {
		type: Number,
		default: 0
	},
	jobsApplied :[
		{
			_id: { type: Schema.Types.ObjectId },
		}
	]
}, {
	timestamps: true
});

module.exports = User = mongoose.model("Users", UserSchema);