import { mongoUri } from '../../config'
import { GetDraftQuery } from './types/get-draft-query'

class DraftDao {
	private model

	constructor() {
		if (mongoUri) {
			require('./mongo/connect')(mongoUri)
			this.model = require('./mongo/draft')
		}
	}

	getAll(tenant: string, user: string) {
		return this.model.getAll(tenant, user)
	}

	getDraft(query: GetDraftQuery) {
		return this.model.getDraft(query)
	}

	setDraft(query: GetDraftQuery, contextData: any) {
		return this.model.setDraft(query, contextData)
	}

	removeDraft(query: GetDraftQuery) {
		return this.model.removeDraft(query)
	}
}

const draftDao = new DraftDao
export default draftDao
