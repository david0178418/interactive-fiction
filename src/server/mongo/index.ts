// Much of this adapted from this article: https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/
// which references this repo: https://github.com/mongodb-developer/nextjs-with-mongodb/blob/main/lib/mongodb.js

import { DbCollections } from '@/common/constants';
import { DbUser } from '@/common/types/User';
import { DbUserMeta } from '@/common/types/UserMeta';
import { Enum } from '@/common/types';
import { DbUserOneClickLinkKey } from '@/common/types/UserOneClickLinkKey';
import { DbSentEmail } from '@/common/types/SentEmail';
import { DbUserProfile } from '@/common/types/UserProfile';
import { setupDb } from './setup-script';
import {
	Collection,
	Db,
	MongoClient,
} from 'mongodb';

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
declare global {
	// eslint-disable-next-line no-var
	var _dbClientPromise: Promise<MongoClient>;
	// eslint-disable-next-line no-var
	var _dbPromise: Promise<Db>;
}

type DbCollectionsEnum = Enum<typeof DbCollections>;

const MongoDbName = process.env.DB_NAME || 'awesome-default-db';
const uri = process.env.MONGODB_URI || '';

let dbClientPromise: Promise<MongoClient>;
let dbPromise: Promise<Db>;

function getDbClient(): Promise<MongoClient> {
	if(!dbClientPromise) {
		dbClientPromise = global._dbClientPromise || new MongoClient(uri).connect();
	}

	if (process.env.NODE_ENV === 'development' && !global._dbClientPromise) {
		global._dbClientPromise = dbClientPromise;
	}

	return dbClientPromise;
}

function getDb(): Promise<Db> {
	if(!dbPromise) {
		dbPromise = global._dbPromise || getDbClient().then((client) => client.db(MongoDbName));
	}

	if (process.env.NODE_ENV === 'development' && !global._dbPromise) {
		global._dbPromise = dbPromise;
	}

	return dbPromise;
}

if (!process.env.MONGODB_URI) {
	throw new Error('Please add your Mongo URI to .env.local');
}

/* eslint-disable @typescript-eslint/indent */
type CollectionType<T> =
	T extends typeof DbCollections.Users ? DbUser :
	T extends typeof DbCollections.UsersMeta ? DbUserMeta :
	T extends typeof DbCollections.UserProfiles ? DbUserProfile :
	T extends typeof DbCollections.UserOneClickLinkKeys ? DbUserOneClickLinkKey :
	T extends typeof DbCollections.SentEmails ? DbSentEmail :
	never;
/* eslint-enable @typescript-eslint/indent */

async function getCollection<T extends DbCollectionsEnum>(collection: T): Promise<Collection<CollectionType<T>>> {
	const db = await getDb();

	return db.collection<CollectionType<T>>(collection);
}

if(process.env.NODE_ENV === 'development') {
	setupDb();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export {
	getDbClient,
	getDb,
	getCollection,
};
