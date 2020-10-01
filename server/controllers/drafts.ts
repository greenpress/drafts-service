import Draft from "../models/draft";

export async function getDraftsList(req, res) {
  try {
    const drafts = await Draft.find();
    if (!drafts) throw new Error();
    res.status(200).json(drafts).end();
  } catch (err) {
    res.status(500).json({ message: "error while finding drafts" }).end();
  }
}
