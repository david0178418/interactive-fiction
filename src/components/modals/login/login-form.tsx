'use client';

import { AuthProviders } from '@/common/constants';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default
function LoginForm() {
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div>
			<label>Username or Email</label>
			<input value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} />

			<label>Password</label>
			<input value={password} onChange={e => setPassword(e.target.value)} />
			<button onClick={async () => {
				return signIn(AuthProviders.Creds, {
					username: usernameOrEmail,
					password,
				});
			}}>
				Login
			</button>
		</div>
	);
}
