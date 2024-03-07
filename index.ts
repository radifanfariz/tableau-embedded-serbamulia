import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import sequelize, { runApp } from "./app/config/db.config";
import { QueryTypes } from "sequelize";
import path from "path";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import setRouter from "./app/routes";
import cors from "cors"

dotenv.config();

const app = express();

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

runApp();

/* jwt setup*/

const secret = "DHDN/sFcJKTsFt8Zkn15D+UW12iw5JFG786G2xU0tXs=";
const secretId = "342926ef-e568-458a-80a4-c6ac397659e1";
const clientId = "192eecee-4d53-401a-8812-368daac8de2a";
const scopes = ["tableau:views:embed", "tableau:views:embed_authoring"];
const userId = "tableau.viewer1@serbamulia.co.id";
const tokenExpiryInMinutes = 10; // Max of 10 minutes.

const userAttributes = {
  //  User attributes are optional.
  //  Add entries to this dictionary if desired.
  //  "[User Attribute Name]": "[User Attribute Value]",
};

// #TOL or Tableau server name. SSL is highly recommeded
const tableauservername = "https://prod-apnortheast-a.online.tableau.com/";

// #public facing url from TOL/ Tableau server
const viz_dash_url =
  tableauservername + "t/serbamuliagroup/views/DashboardSMFVersion2/Dashboard1";

const header = {
  alg: "HS256",
  typ: "JWT",
  kid: secretId,
  iss: clientId,
};

const data = {
  jti: uuidv4(),
  aud: "tableau",
  sub: userId,
  url: viz_dash_url,
  scp: scopes,
  exp: Math.floor(Date.now() / 1000) + tokenExpiryInMinutes * 60,
  ...userAttributes,
};

/*for testing*/
// const test = sequelize.query(
//   "SELECT * FROM APPS.XXCUST_SM_BUDGET_FUND_AVAIL_V",
//   { type: QueryTypes.SELECT }
// );
// test.then((value) => {
//   console.log(value);
// });

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

setRouter(app)

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
