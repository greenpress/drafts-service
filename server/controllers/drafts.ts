import Draft from "../models/draft";

export async function getDraftsList(req, res) {
  try {
    const drafts = await Draft.find({
      user: req.user._id,
      tenant: req.headers.tenant,
    });
    if (!drafts) throw new Error();
    res.status(200).json(drafts).end();
  } catch (err) {
    res.status(500).json({ message: "error while finding drafts" }).end();
  }
}

type GetDraftQuery = {
  contextId?: string;
  contextType?: string;
  user: string;
  tenant: string;
};

export async function getDraft(req, res) {
  try {
    const query: GetDraftQuery = {
      user: req.user._id,
      tenant: req.headers.tenant,
    };
    const { contextType, contextId } = req.query;
    if (contextType) query.contextType = contextType;
    if (contextId) query.contextId = contextId;
    const draft = await Draft.findOne(query).lean();
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
    const user = req.user._id;
    const { tenant } = req.headers;
    const { contextType, contextId = null } = req.query;
    const query = { user, tenant, contextType, contextId };
    const update = {
      contextData: req.body || {},
    };

    const draft = await Draft.findOneAndUpdate(query, update, {
      upsert: true,
      useFindAndModify: true,
      new: true,
      setDefaultsOnInsert: true,
    }).lean();

    res.status(200).json(draft).end();
  } catch (err) {
    res.status(500).json({ message: "error mutating draft" }).end();
  }
}

export async function deleteDraft(req, res) {
  try {
    const { contextType, contextId } = req.params;
    const { tenant } = req.headers;
    const options = { useFindAndModify: true };
    const deletedDraft = await Draft.findOne(
      { contextType, contextId, tenant },
      options,
    );
    deletedDraft?.remove();
    res.status(200).json(deletedDraft).end();
  } catch (err) {
    res.status(500).json({ message: "couldn't delete draft" });
  }
}
