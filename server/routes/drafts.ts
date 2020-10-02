import { getDraft, getDraftsList, setDraft } from "../controllers/drafts";
import { authCheck } from "../middleware/auth-check";

export default (app) => {
  app
    .get("/api/drafts", authCheck, getDraftsList)
    .get("/api/drafts/all/:draftId", authCheck, getDraft)
    .get("/api/drafts/:contextType/:draftId", authCheck, getDraft)
    .post("/api/drafts/:contextType", authCheck, setDraft)
    .put("/api/drafts/:contextType/:draftId", authCheck, setDraft);
  // you can also PUT `/api/drafts/:contextType/new` to add new drafts
};
