import mongoose from "mongoose";

const facultySchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		designation: {
			type: String,
			trim: true,
			required: true,
		},
		department: {
			type: String,
			trim: true,
			required: true,
		},
		coursesAssigned: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
				required: true,
			},
		],
		joinedAt: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Faculties = mongoose.model("Faculty", facultySchema);

export default Faculties;
