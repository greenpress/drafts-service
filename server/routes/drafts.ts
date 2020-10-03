import { getDraft, getDraftsList, setDraft } from "../controllers/drafts";
// I'm using require because those functions have no type decleations
const { populateUser, verifyUser } = require(
  "@greenpress/api-kit/user-middlewares",
);

export default (app) => {
  app
    .get("/api/drafts", populateUser, verifyUser, getDraftsList)
    .get("/api/drafts/all/:draftId", populateUser, verifyUser, getDraft)
    .get(
      "/api/drafts/:contextType/:draftId",
      populateUser,
      verifyUser,
      getDraft,
    )
    .post("/api/drafts", populateUser, verifyUser, setDraft)
    .put("/api/drafts/:draftId", populateUser, verifyUser, setDraft);
};
