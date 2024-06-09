import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  TableauEmbedV1,
  TableauEmbedV2,
  TableauEmbedV3,
  TableauEmbedMaster,
} from "../models";
import { Op } from "sequelize";
import _ from "lodash";

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

export const embedByInput = (req: any, res: any) => {
  const data = {
    jti: uuidv4(),
    aud: "tableau",
    sub: userId,
    // url: viz_dash_url,
    scp: scopes,
    exp: Math.floor(Date.now() / 1000) + tokenExpiryInMinutes * 60,
    ...userAttributes,
  };
  const token = jwt.sign(data, secret, { header });
  console.log(token);
  res.render("index-input", {
    token: token,
    url: viz_dash_url,
  });
};

export const embedByParams = (req: any, res: any) => {
  const data = {
    jti: uuidv4(),
    aud: "tableau",
    sub: userId,
    // url: viz_dash_url,
    scp: scopes,
    exp: Math.floor(Date.now() / 1000) + tokenExpiryInMinutes * 60,
    ...userAttributes,
  };
  const token = jwt.sign(data, secret, { header });
  console.log(token);
  res.render("index-params", {
    token: token,
    url: req.query.url,
  });
};

export const embedByParamsLimitedV1 = async (req: any, res: any) => {
  try {
    const data = {
      jti: uuidv4(),
      aud: "tableau",
      sub: userId,
      // url: viz_dash_url,
      scp: scopes,
      exp: Math.floor(Date.now() / 1000) + tokenExpiryInMinutes * 60,
      ...userAttributes,
    };
    const token = jwt.sign(data, secret, { header });
    console.log("embedByParamsLimitedV1 token: ", token);
    const tableauEmbedDataFromDbV1 = await TableauEmbedV1.findAll();
    console.log(
      "tableauEmbedDataFromDbV1 data from db: ",
      tableauEmbedDataFromDbV1
    );

    const checkEmployeeId =
      tableauEmbedDataFromDbV1[0].dataValues.j_employee_id.some(
        (item: number) => item === parseInt(req.query.employeeId)
      );
    const checkEmployeeNik =
      tableauEmbedDataFromDbV1[0].dataValues.j_employee_nik.some(
        (item: string) => item === req.query.employeeNik
      );
    const checkEmbedUrl = (embedUrl: string) =>
      tableauEmbedDataFromDbV1[0].dataValues.c_embed === embedUrl
        ? embedUrl
        : tableauEmbedDataFromDbV1[0].dataValues.c_embed;

    if (checkEmployeeId || checkEmployeeNik) {
      res.render("index-params", {
        token: token,
        url: checkEmbedUrl(req.query.url),
      });
    } else {
      res.render("404", {
        // token: token,
        // url: req.query.url,
      });
    }
  } catch (e) {
    res.render("404", {
      // token: token,
      // url: req.query.url,
    });
  }
};
export const embedByParamsLimitedV2 = async (req: any, res: any) => {
  try {
    const data = {
      jti: uuidv4(),
      aud: "tableau",
      sub: userId,
      // url: viz_dash_url,
      scp: scopes,
      exp: Math.floor(Date.now() / 1000) + tokenExpiryInMinutes * 60,
      ...userAttributes,
    };
    const token = jwt.sign(data, secret, { header });
    console.log("embedByParamsLimitedV2 token: ", token);
    const tableauEmbedDataFromDbV2 = await TableauEmbedV2.findOne({
      where: {
        [Op.or]: [
          {
            n_employee_id: parseInt(req.query.employeeId) ?? null,
          },
          {
            c_employee_nik: req.query.employeeNik ?? null,
          },
        ],
      },
    });
    console.log(
      "tableauEmbedDataFromDbV2 data from db: ",
      tableauEmbedDataFromDbV2
    );

    if (!_.isNil(tableauEmbedDataFromDbV2)) {
      res.render("index-params", {
        token: token,
        url: tableauEmbedDataFromDbV2.dataValues.j_embed[
          parseInt(req.query.index)
        ],
      });
    } else {
      res.render("404", {
        // token: token,
        // url: req.query.url,
      });
    }
  } catch (e) {
    res.render("404", {
      // token: token,
      // url: req.query.url,
    });
  }
};
export const embedByParamsLimitedV3 = async (req: any, res: any) => {
  try {
    const data = {
      jti: uuidv4(),
      aud: "tableau",
      sub: userId,
      // url: viz_dash_url,
      scp: scopes,
      exp: Math.floor(Date.now() / 1000) + tokenExpiryInMinutes * 60,
      ...userAttributes,
    };
    const token = jwt.sign(data, secret, { header });
    console.log("embedByDropdown token: ", token);
    const tableauEmbedDataFromDbV3 = await TableauEmbedV3.findOne({
      where: {
        [Op.or]: [
          {
            n_employee_id: parseInt(req.query.employeeId ?? 0) ?? null,
          },
          {
            c_employee_nik: req.query.employeeNik ?? "",
          },
        ],
      },
    });
    console.log(
      "tableauEmbedDataFromDbV3 data from db: ",
      tableauEmbedDataFromDbV3
    );

    const tableauEmbedDataFromMasterAll = await TableauEmbedMaster.findAll({
      where: {
        n_id: {
          [Op.in]: tableauEmbedDataFromDbV3?.dataValues.j_embed_id,
        },
      },
    });
    console.log(
      "tableauEmbedDataFromMasterAll data from db: ",
      tableauEmbedDataFromMasterAll
    );

    if (!_.isNil(tableauEmbedDataFromDbV3)) {
      res.render("index-dropdown", {
        token: token,
        master: JSON.stringify(
          tableauEmbedDataFromMasterAll?.map((item1) =>
            tableauEmbedDataFromMasterAll?.map((item2) => {
              if (item1.dataValues.c_group === item2.dataValues.c_group) {
                return {
                  group: item1.dataValues.c_group,
                  items: {
                    ...item2.dataValues,
                  },
                };
              }
            }).filter(Boolean)
          ).filter(Boolean)
        ),
      });
    } else {
      res.render("404", {
        // token: token,
        // url: req.query.url,
      });
    }
  } catch (e) {
    res.render("404", {
      // token: token,
      // url: req.query.url,
    });
  }
};

export const embedByParamsFinancialModel = async (req: any, res: any) => {
  try {
    const data = {
      jti: uuidv4(),
      aud: "tableau",
      sub: userId,
      // url: viz_dash_url,
      scp: scopes,
      exp: Math.floor(Date.now() / 1000) + tokenExpiryInMinutes * 60,
      ...userAttributes,
    };
    const token = jwt.sign(data, secret, { header });
    console.log("embedByDropdown token: ", token);
    const tableauEmbedDataFromDbV3 = await TableauEmbedV3.findOne({
      where: {
        [Op.or]: [
          {
            n_employee_id: parseInt(req.query.employeeId ?? 0) ?? null,
          },
          {
            c_employee_nik: req.query.employeeNik ?? "",
          },
        ],
      },
    });
    console.log(
      "tableauEmbedDataFromDbV3 data from db: ",
      tableauEmbedDataFromDbV3
    );

    const tableauEmbedDataFromMasterAll = await TableauEmbedMaster.findAll({
      where: {
        n_id: {
          [Op.in]: tableauEmbedDataFromDbV3?.dataValues.j_embed_id,
        },
      },
    });
    console.log(
      "tableauEmbedDataFromMasterAll data from db: ",
      tableauEmbedDataFromMasterAll
    );

    if (!_.isNil(tableauEmbedDataFromDbV3)) {
      res.render("index-simulation", {
        token: token,
        master: JSON.stringify(
          tableauEmbedDataFromMasterAll?.map((item1) =>
            tableauEmbedDataFromMasterAll?.map((item2) => {
              if (item1.dataValues.c_group === item2.dataValues.c_group) {
                return {
                  group: item1.dataValues.c_group,
                  items: {
                    ...item2.dataValues,
                  },
                };
              }
            }).filter(Boolean)
          ).filter(Boolean)
        ),
      });
    } else {
      res.render("404", {
        // token: token,
        // url: req.query.url,
      });
    }
  } catch (e) {
    res.render("404", {
      // token: token,
      // url: req.query.url,
    });
  }
};
