import Draft  from './models/draft'
import { GetDraftQuery } from '../types/get-draft-query'

export function getAll(tenant: string, user: string) {
	return Draft.find({ user, tenant }).lean().exec()
}

export function getDraft(query: GetDraftQuery) {
	return Draft.findOne(query).lean().exec()
}

export function setDraft(query: GetDraftQuery, contextData: any) {
	return Draft.findOneAndUpdate(query, { contextData }, {
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	}).lean().exec()
}

export function removeDraft(query: GetDraftQuery) {
	return Draft.deleteOne(query).exec()
}
