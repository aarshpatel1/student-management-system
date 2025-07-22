import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true,
		required: true,
	},
	duration: {
		type: String,
		trim: true,
		required: true,
	},
	fee: {
		type: Number,
		trim: true,
		required: true,
	},
	syllabus: {
		type: [String],
		trim: true,
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
		required: true,
	},
	faculties: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Faculty",
		},
	],
});

const Courses = mongoose.model("Course", courseSchema);

export default Courses;
