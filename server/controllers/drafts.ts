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

type GetDraftQuery = { _id: string; contextType: string; user: string };

export async function getDraft(req, res) {
  try {
    const { contextType, draftId } = req.params;
    const { _id: user } = req.user;
    const query: GetDraftQuery = { _id: draftId, user, contextType };
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
  try {
    const query = req.body._id ? { _id: req.body._id } : {};
    const update = {
      ...req.body,
      user: req.user._id,
      tenant: req.headers.tenant,
    };

    const draft = await Draft.findOneAndUpdate(query, update, {
      upsert: true,
      useFindAndModify: true,
      new: true,
      setDefaultsOnInsert: true,
    });

    res.status(200).json(draft).end();
  } catch (err) {
    res.status(500).json({ message: "error mutating draft" }).end();
  }
}
