import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
	faculty: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Faculty",
	},
	batchName: {
		type: String,
		trim: true,
		required: true,
	},
	timing: {
		type: String,
		trim: true,
		required: true,
	},
	status: {
		type: String,
		enum: ["running", "completed", "upcoming", "suspended"],
		required: true,
	},
});

const Batches = mongoose.model("Batch", batchSchema);

export default Batches;
