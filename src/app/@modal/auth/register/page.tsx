'use client';

import register from '@/server/actions/register';
import { useState } from 'react';

export default
function RegisterPage() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div>
			<label>Email</label>
			<input value={email} onChange={e => setEmail(e.target.value)} />

			<label>Username</label>
			<input value={username} onChange={e => setUsername(e.target.value)} />

			<label>Password</label>
			<input value={password} onChange={e => setPassword(e.target.value)} />
			<button onClick={async () => {
				const x = await register({
					email,
					password,
					username,
				});

				console.log(x);
			}}>
				register
			</button>
		</div>
	);
}
