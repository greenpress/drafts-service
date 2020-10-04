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
  app
    .get("/api/drafts", populateUser, verifyUser, getDraftsList)
    .get(
      "/api/drafts/:contextType/:contextId",
      populateUser,
      verifyUser,
      getDraft,
    )
    .put("/api/drafts/", populateUser, verifyUser, setDraft)
    .delete(
      "/api/drafts/:contextType/:contextId",
      populateUser,
      verifyUser,
      deleteDraft,
    );
};
