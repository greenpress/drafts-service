import { mongoUri, port, ip } from "./config";

// connect to the database and load models
require("./server/models").connect(mongoUri);

require("./server/routes");

require("@greenpress/api-kit")
  .start("Drafts Service", port, ip);
