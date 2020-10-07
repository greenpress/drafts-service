import {
  deleteDraft,
  getDraft,
  getDraftsList,
  setDraft,
} from "../controllers/drafts";
// I'm using require because those functions have no type decleations
const { populateUser, verifyUser } = require(
  "@greenpress/api-kit/user-middlewares",
);

export default (app) => {
  app.use(populateUser);
  app.use(verifyUser);

  app
    .get("/api/drafts/all", getDraftsList)
    .get("/api/drafts", getDraft)
    .put("/api/drafts", setDraft)
    .delete("/api/drafts", deleteDraft);
};
