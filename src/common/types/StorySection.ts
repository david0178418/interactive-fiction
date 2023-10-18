import { ObjectId } from 'mongodb';
import { nowISOString } from '../utils';

export
interface DbStorySection {
	_id: ObjectId;
	storyId: ObjectId;
	createdDate: Date;
	title: string;
	content: string;
	updatedDate: Date;
	nextOptions: Array<{
		storySectionId: ObjectId;
		text: string;
	}>;
}

export
interface UiStorySection {
	_id: string;
	storyId: string;
	createdDateISOString: string;
	title: string;
	content: string;
	updatedDateISOString: string;
	nextOptions: Array<{
		storySectionId: string;
		text: string;
	}>;
}

export
function createDbStorySection(): DbStorySection {
	return {
		_id: new ObjectId(),
		storyId: new ObjectId(),
		createdDate: new Date(),
		updatedDate: new Date(),
		title: '',
		content: '',
		nextOptions: [],
	};
}

export
function createUiStorySection(): UiStorySection {
	return {
		_id: '',
		storyId: '',
		createdDateISOString: nowISOString(),
		updatedDateISOString: nowISOString(),
		title: '',
		content: '',
		nextOptions: [],
	};
}
