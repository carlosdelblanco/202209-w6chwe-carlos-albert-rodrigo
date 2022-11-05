import "./loadEnvironments.js";
import connectToDb from "./database/index.js";
import startServer from "./server/app.js";

const { PORT: port, MONGODB_URL: url } = process.env;

await connectToDb(url);
// eslint-disable-next-line no-implicit-coercion
startServer(+port);
