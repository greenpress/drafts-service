import Draft, { IDraft } from "../models/draft";

export async function getDraftsList(req, res) {
  try {
    const drafts = await Draft.find();
    if (!drafts) throw new Error();
    res.status(200).json(drafts).end();
  } catch (err) {
    res.status(500).json({ message: "error while finding drafts" }).end();
  }
}

export async function getDraft(req, res) {
  type Query = { _id: string; contextType?: string; user: string };
  try {
    const { contextType, draftId } = req.params;
    const { _id: user } = req.user;
    let query: Query = { _id: draftId, user };
    if (contextType) query.contextType = contextType;
    const draft = await Draft.findOne(query);
    if (!draft) throw new Error();
    res.status(200).json(draft).end();
  } catch (err) {
    res.status(404).json({ message: "draft not found" }).end();
  }
}

/** 
 * for both creating and updating a draft, just like a Map data type
 * the frontend doesn't care if the draft exists or not, it just passes the contextData.
*/
export async function setDraft(req, res) {
  let draft: IDraft;
  try {
    // get data
    const { draftId, contextType } = req.params;
    const { _id: user } = req.user;
    const { tenant } = req.headers;
    const contextId = { ...req.body }.contextId;
    delete req.body.contextId;

    // find or create draft
    if (!draftId || draftId === "new") {
      draft = new Draft({
        contextType,
        user,
        tenant,
        contextData: req.body,
        contextId,
      });
    } else {
      const nullableDraft = await Draft.findOne({ draftId, contextType, user });
      if (!nullableDraft) {
        res.status(404).json({ message: "draft not found" }).end();
        return;
      }
      draft = nullableDraft;
      draft.contextData = req.body;
      if (contextId) draft.contextId = contextId;
    }

    // save draft
    await draft.save();
    res.status(200).json(draft).end();
  } catch (err) {
    res.status(500).json({ message: "error mutating draft" }).end();
  }
}
