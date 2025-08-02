import db from "./config/db.js";
import router from "./routes/index.js";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
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
		origin: process.env.CORS_ORIGIN || "*",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api", router);

app.listen(port, (err) =>
	err
		? console.error("Error starting server:", err)
		: console.log(`Server running on http://127.0.0.1:${port}`)
);
