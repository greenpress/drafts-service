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
    const { draftId } = req.params;
    const { _id: user } = req.user;
    const { tenant } = req.headers;

    // find or create draft
    if (!draftId) {
      draft = new Draft({
        ...req.body,
        user,
        tenant,
      });
    } else {
      const nullableDraft = await Draft.findOne({ draftId });
      if (!nullableDraft) {
        res.status(404).json({ message: "draft not found" }).end();
        return;
      }
      draft = nullableDraft;
      for (let key in req.body) {
        draft[key] = req.body[key];
      }
    }

    // save draft
    await draft.save();
    res.status(200).json(draft).end();
  } catch (err) {
    res.status(500).json({ message: "error mutating draft" }).end();
  }
}
