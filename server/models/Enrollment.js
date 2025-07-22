import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema(
	{
		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},
		courseId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},
		enrolledDate: {
			type: String,
			trim: true,
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "completed", "cancelled"],
			required: true,
		},
	},
	{
		timestamp: true,
	}
);

const Enrollments = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollments;
