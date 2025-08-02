import userRoutes from "./userRoutes.js";
import studentRoutes from "./studentRoutes.js";
import facultyRoutes from "./facultyRoutes.js";
import enrollmentRoutes from "./enrollmentRoutes.js";
import courseRoutes from "./courseRoutes.js";
import feeRoutes from "./feeRoutes.js";
import batchRoutes from "./batchRoutes.js";
import authRoutes from "./authRoutes.js";

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to API v1 endpoints",
		endpoints: [
			{
				path: "/user",
				description: "User management endpoints",
			},
			{
				path: "/student",
				description: "Student management endpoints",
			},
			{
				path: "/faculty",
				description: "Faculty authentication endpoints",
			},
		],
	});
});

router.use("/user", userRoutes);

router.use("/student", studentRoutes);

router.use("/faculty", facultyRoutes);

router.use("/batch", batchRoutes);

router.use("/course", courseRoutes);

router.use("/enrollement", enrollmentRoutes);

router.use("/fee", feeRoutes);

router.use("/auth", authRoutes);

export default router;
