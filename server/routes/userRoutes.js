import { validateUser } from "../middleware/validationMiddleware.js";
import * as userController from "../controllers/userController.js";
import Users from "../models/User.js";

import express from "express";

const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);

router.get("/getUser/:id", userController.getUser);

router.post(
	"/addUser",
	Users.uploadStudentProfilePhoto,
	validateUser("create"),
	userController.addUser
);

router.put(
	"/updateUser/:id",
	Users.uploadStudentProfilePhoto,
	validateUser("update"),
	userController.updateUser
);

router.patch(
	"/updateUser/:id",
	Users.uploadStudentProfilePhoto,
	validateUser("update"),
	userController.updateUser
);

router.delete("/deleteUser/:id", userController.deleteUser);

export default router;
