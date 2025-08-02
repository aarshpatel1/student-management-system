import Users from "../models/User.js";

import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { config } from "dotenv";

config({
	path: "./.env",
	quiet: true,
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
	ignoreExpiration: false,
};

passport.use(
	"jwt",
	new JwtStrategy(jwtOptions, async (payload, done) => {
		console.log(payload.id);
		try {
			// Fix: Check for payload.id only
			if (!payload.id) {
				return done(null, false, { message: "Invalid token payload" });
			}

			const currentTimestamp = Math.floor(Date.now() / 1000);
			if (payload.exp && payload.exp < currentTimestamp) {
				return done(null, false, { message: "Token expired" });
			}

			const user = await Users.findById(payload.id);

			if (!user) {
				return done(null, false, { message: "User not found" });
			}

			if (!user.status) {
				return done(null, false, {
					message: "User account inactive",
				});
			}

			return done(null, user);
		} catch (err) {
			return done(err, false);
		}
	})
);

passport.serializeUser((user, done) => {
	return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await Users.findById(id);
		if (user && user.status) {
			return done(null, user);
		} else {
			return done(null, false, {
				message: user ? "Account inactive" : "User not found",
			});
		}
	} catch (error) {
		return done(error, false);
	}
});

export default passport;

// import jwt from "jsonwebtoken";
// import Users from "../models/User.js";

// export const protect = async (req, res, next) => {
// 	const authHeader = req.headers.authorization;

// 	if (!authHeader || !authHeader.startsWith("Bearer ")) {
// 		return res.status(401).json({ message: "Not authorized" });
// 	}

// 	try {
// 		const token = authHeader.split(" ")[1];
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);
// 		req.user = await Users.findById(decoded.id).select("-password");
// 		next();
// 	} catch (error) {
// 		res.status(401).json({ message: "Token failed" });
// 	}
// };
