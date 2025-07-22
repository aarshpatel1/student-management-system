import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		enrollmentNumber: {
			type: String,
			trim: true,
			required: true,
		},
		courseEnrolled: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		dateOfAdmission: {
			type: String,
			trim: true,
			required: true,
		},
		batch: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Batch",
		},
		feesPaid: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Fee",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Students = mongoose.model("Student", studentSchema);

export default Students;
