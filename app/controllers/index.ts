import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

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
  // url: viz_dash_url,
  scp: scopes,
  exp: Math.floor(Date.now() / 1000) + tokenExpiryInMinutes * 60,
  ...userAttributes,
};

export const embedByInput = (req: any, res: any) => {
  const token = jwt.sign(data, secret, { header });
  console.log(token);
  res.render("index-input", {
    token: token,
    url: viz_dash_url,
  });
};

export const embedByParams = (req: any, res: any) => {
  const token = jwt.sign(data, secret, { header });
  console.log(token);
  res.render("index-params", {
    token: token,
    url: req.query.url,
  });
};
