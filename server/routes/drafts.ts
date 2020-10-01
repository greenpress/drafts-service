import { getDraftsList } from "../controllers/drafts";

export default (app) => {
  app.get("/api/drafts", /* AUTH? */ getDraftsList);
};
