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
      "/api/drafts/:contextType/:draftId",
      populateUser,
      verifyUser,
      getDraft,
    )
    .put("/api/drafts/", populateUser, verifyUser, setDraft)
    // don't need draftId here, it's recieved from the request body
    .delete(
      "/api/drafts/:contextType/:contextId",
      populateUser,
      verifyUser,
      deleteDraft,
    );
};
