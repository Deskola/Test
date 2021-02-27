//Require mongoose lib
const mongoose = require('mongoose');

//Define the Internship database schema
const internshipSchema = new mongoose.Schema(
	{
		organization:{
			type: String,
			required: true
		},
		position_name: {
			type: String,
			required: true
		},
        position_number: {
			type: String,
			required: false
		},		
		duration: {
			type: String,
			required: false
		},
		responsibility: {
			type: String,
			required: true
		},
        qualifications: {
			type: String,
			required: true
		},
        application_info: {
			type: String,
			required: true
		},
        poster: {
			type: String,
			required: false
		},
		client: {
			type: mongoose.Types.ObjectId,
			ref: 'User',			
			required: true
		},		
		favoriteCount: {
			type: Number,
			default: 0
		},
		 
		favoritedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		]
		
	},
	{
        //Assigns createdAt and updatedAt fields with a Date type
		timestamps: true
	}
);

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;