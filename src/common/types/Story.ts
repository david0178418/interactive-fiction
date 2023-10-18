import { ObjectId } from 'mongodb';

export
interface DbStory {
	_id: ObjectId;
	createdDate: Date;
	summary: string;
	title: string;
	updatedDate: Date;
	owner: {
		id: ObjectId;
		username: string;
	}
}
export
interface UiStory {
	_id: string;
	createdDateISOString: string;
	summary: string;
	title: string;
	updatedDateISOString: string;
	owner: {
		id: string;
		username: string;
	}
}

export
function createDbStory(): DbStory {
	return {
		_id: new ObjectId(),
		createdDate: new Date(),
		updatedDate: new Date(),
		title: '',
		summary: '',
		owner: {
			id: new ObjectId(),
			username: '',
		},
	};
}

export
function createUiStory(): UiStory {
	return {
		_id: '',
		createdDateISOString: new Date().toISOString(),
		updatedDateISOString: new Date().toISOString(),
		title: '',
		summary: '',
		owner: {
			id: '',
			username: '',
		},
	};
}