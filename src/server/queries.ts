import { ObjectId, WithId } from 'mongodb';
import { getCollection } from './mongo';
import { DbUser } from '@/common/types/User';
import { DbCollections } from '@/common/constants';
import { makeId, nowISOString } from '@/common/utils';
import { add } from 'date-fns';

export
async function fetchUser(usernameOrEmail: string): Promise<DbUser | null> {
	const col = await getCollection(DbCollections.Users);
	const result = await col.aggregate<WithId<DbUser>>([
		{
			$match: {
				$or: [
					{ usernameLower: usernameOrEmail.toLocaleLowerCase() },
					{ email: usernameOrEmail },
				],
			},
		},
		{ $limit: 1 },
	]).toArray();

	return result[0] || null;
}

export
async function createUserLoginKey(email: string) {
	if(!await fetchUser(email)) {
		return '';
	}

	const key = makeId(64);

	const col = await getCollection(DbCollections.UserOneClickLinkKeys);

	await col.updateOne(
		{ email },
		{
			$set: {
				key,
				expirationDate: add(new Date(), { minutes: 10 }).toISOString(),
			},
			$setOnInsert: { email },
		}, { upsert: true });

	return key;
}

export
async function getUserFromKey(key: string): Promise<DbUser | null> {
	const col = await getCollection(DbCollections.UserOneClickLinkKeys);
	const result = await col.findOne({ key });

	if(!result) {
		return null;
	}

	col.deleteOne({ _id: result._id });

	if(result.expirationDate < nowISOString()) {
		return null;
	}

	return fetchUser(result.email);
}

export
async function checkCredentialAvailability(username: string, email: string) {
	const usersCol = await getCollection(DbCollections.Users);
	const results = await usersCol.aggregate<WithId<DbUser>>([
		{
			$match: {
				$or: [
					{ usernameLower: username.toLocaleLowerCase() },
					{ email },
				],
			},
		},
		{ $limit: 2 },
	]).toArray();

	if(!results.length) {
		return { available: true };
	}

	return {
		available: false,
		email: !!results.find(r => r.email === email),
		username: !!results.find(r => r.usernameLower === username.toLocaleLowerCase()),
	};
}

export
async function updateLastLogin(id: ObjectId | string) {
	const col = await getCollection(DbCollections.UsersMeta);

	await col.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { lastLogin: nowISOString() } },
	);
}
