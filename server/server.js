import db from "./config/db.js";
import "./middleware/authMiddleware.js";
import router from "./routes/index.js";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { config } from "dotenv";

config({
	path: "./.env",
	quiet: true,
});

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet());

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: "passportJWT",
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(port, (err) =>
	err
		? console.error("Error starting server:", err)
		: console.log(`Server running on http://127.0.0.1:${port}`)
);
