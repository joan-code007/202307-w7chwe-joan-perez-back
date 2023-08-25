import debugCreator from "debug";
import app from "./index.js";

const debug = debugCreator("robositos:server:start");

const startServer = (port: string | number) => {
  app.listen(Number(port), () => {
    debug(`Listening on http://localhost:${port}/robositos`);
  });
};

export default startServer;
