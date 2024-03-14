import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import setRouter from "./app/routes";
import cors from "cors"
import { runApp } from "./app/config/db.config";

dotenv.config();

runApp();

const app = express();

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.static('public'));

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

setRouter(app)

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
