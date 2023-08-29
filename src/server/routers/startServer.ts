import debugCreator from "debug";
import "dotenv/config";
import app from "./index.js";

const debug = debugCreator("robots:server:start");

const startServer = (port: string | number) => {
  app.listen(port, () => {
    debug(`Listening on http://localhost:${port}/things`);
  });
};

export default startServer;
