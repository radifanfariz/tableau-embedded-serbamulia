import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import OracleDB from "oracledb";

dotenv.config();

const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_service = process.env.DB_SERVICE;

OracleDB.initOracleClient({libDir:"./app/utils/instant_client"})

const sequelize = new Sequelize(
  `oracle://${db_user}:${db_password}@${db_host}:${db_port}/${db_service}`
);

// const sequelize = new Sequelize(db_service!, db_user!, db_password, {
//   host: db_host,
//   port: Number(db_port),
//   dialect: "oracle",
//   dialectOptions: {connectString: 'localhost/freepdb1', 
//   maxRows: 100, fetchAsString: [OracleDB.NUMBER]}
// });

export async function runApp() {
  try {
    await sequelize.authenticate();
    console.log("Authentication Successful");
  } catch (err) {
    console.error(err);
  } finally {
    sequelize.close();
  }
}

export default sequelize;
