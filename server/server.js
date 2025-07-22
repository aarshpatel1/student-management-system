import express from "express";
import { config } from "dotenv";
import router from "./routes/index.js";

config({
	path: "../.env",
	quiet: true,
});

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(port, (err) =>
	err
		? console.error("Error starting server:", err)
		: console.log(`Server running on http://127.0.0.1:${port}`)
);
