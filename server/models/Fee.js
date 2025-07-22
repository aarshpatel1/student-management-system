import mongoose from "mongoose";

const feeSchema = mongoose.Schema(
	{
		student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
		},
		amount: {
			type: Number,
			required: true,
		},
		paymentDate: {
			type: String,
			required: true,
		},
		paymentMethod: {
			type: String,
			enum: ["cash", "online", "card"],
			required: true,
		},
		status: {
			type: String,
			enum: ["paid", "pending"],
			required: true,
		},
	},
	{
		timestamp: true,
	}
);

const Fees = mongoose.model("Fee", feeSchema);

export default Fees;
