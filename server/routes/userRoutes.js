import { validateUser } from "../middleware/validationMiddleware.js";
import * as userController from "../controllers/userController.js";
import Users from "../models/User.js";

import express from "express";
import passport from "passport";

const router = express.Router();

const authenticate = passport.authenticate("jwt", {
	failureRedirect: "/api/user/failedLogin",
});

router.get("/getAllUsers", authenticate, userController.getAllUsers);

router.get("/getUser/:id", authenticate, userController.getUser);

router.post(
	"/addUser",
	authenticate,
	Users.uploadStudentProfilePhoto,
	validateUser("create"),
	userController.addUser
);

router.put(
	"/updateUser/:id",
	authenticate,
	Users.uploadStudentProfilePhoto,
	validateUser("update"),
	userController.updateUser
);

router.patch(
	"/updateUser/:id",
	authenticate,
	Users.uploadStudentProfilePhoto,
	validateUser("update"),
	userController.updateUser
);

router.delete("/deleteUser/:id", authenticate, userController.deleteUser);

router.get("/failedLogin", userController.failedLogin);

export default router;
