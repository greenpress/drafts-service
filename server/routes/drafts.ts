import { getDraftsList } from "../controllers/drafts";
import { authCheck } from "../middleware/auth-check";

export default (app) => {
  app.get("/api/drafts", authCheck, getDraftsList);
};
