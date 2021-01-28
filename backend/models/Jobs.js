const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
    },
    maxApplicants: {
        type: Number,
		required: true
    },
    receivedApplicants: [
        {
            _id: {type: Schema.Types.ObjectId },
            email: { type: String },
            sop: { type: String },
            status: {type: String },
            dateOfApplication: {type: Date},
            dateOfJoining: {type: Date}
        }
    ],
    maxPositions: {
        type: Number,
		required: true
    },
    noOfAccepted : {
        type: Number,
        default: 0
    },
	dateOfPosting: {
		type: Date,
        required: true,
        default: Date.parse(new Date())
    },
    deadline: {
        type: Date,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    typeOfJob: {
        type: String,
        required: true
    },
    duration: {
        type: String,
		required: true
    },
    salary:{
        type: Number,
		required: true
    },
    rating: {
        type: Number,
		default: 0
    }
}, {
    timestamps: true,
});

module.exports = Job = mongoose.model("Jobs", jobSchema);
