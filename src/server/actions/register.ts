'use server';
import { getCollection } from '@/server/mongo';
import { getServerSession } from '@/server/auth-options';
import { checkCredentialAvailability } from '@/server/queries';
import { passwordToHash } from '@/server/transforms';
import { ObjectId } from 'mongodb';
import { z, ZodType } from 'zod';
import {
	DbCollections,
	UserRoles,
} from '@/common/constants';
import {
	EmailValidation,
	PasswordValidation,
	UsernameValidation,
} from '@/common/types/UserCredentials';

interface Schema {
	email: string;
	password: string;
	username: string;
}

const Validation: ZodType<Schema> = z.object({
	email: EmailValidation,
	username: UsernameValidation,
	password: PasswordValidation,
});

export default
async function register(data: Schema) {
	const session = await getServerSession();

	if(session) {
		// redirect to home page
		return;
	}

	const result = await Validation.safeParseAsync(data);

	if(!result.success) {
		return {
			ok: false,
			errors: result
				.error
				.errors
				.map(e => e.message),
		};
	}

	const {
		username,
		email,
		password,
	} = result.data;

	const availabilityResults = await checkCredentialAvailability(username, email);

	if(!availabilityResults.available) {
		const errors = [];

		if(availabilityResults.username) {
			errors.push(`User "${username}" already exists`);
		}

		if(availabilityResults.email) {
			errors.push(`Email "${email}" is already used`);
		}

		return {
			ok: false,
			errors,
		};
	}

	await createUser({
		username,
		email,
		password,
	});

	return { ok: true };
}

export
async function createUser(args: Schema) {
	const {
		email,
		password,
		username,
	} = args;
	const usersCol = await getCollection(DbCollections.Users);
	const usersMetaCol = await getCollection(DbCollections.UsersMeta);
	const userProfilesCol = await getCollection(DbCollections.UserProfiles);
	const hash = await passwordToHash(password);
	const nowDate = new Date();
	const nowISOStr = nowDate.toISOString();
	const _id = new ObjectId();

	const result = await usersCol
		.insertOne({
			_id,
			username,
			usernameLower: username.toLocaleLowerCase(),
			email,
			hash,
			role: UserRoles.User,
		});

	await Promise.all([
		usersMetaCol
			.insertOne({
				_id: result.insertedId,
				userId: result.insertedId,
				created: nowISOStr,
				lastLogin: nowISOStr,
			}),
		userProfilesCol
			.insertOne({
				_id: result.insertedId,
				shortBio: '',
				detailedBio: '',
				username,
			}),
	]);
}
