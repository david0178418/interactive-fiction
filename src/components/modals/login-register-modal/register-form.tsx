'use client';

import { AuthProviders } from '@/common/constants';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import register from '@/server/actions/register';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default
function RegisterForm() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<div>
				<div className="grid w-full items-center gap-1.5 mb-5">
					<Label>Email</Label>
					<Input
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="grid w-full items-center gap-1.5 mb-5">
					<Label>Username</Label>
					<Input
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className="grid w-full items-center gap-1.5 mb-5">
					<Label>Password</Label>
					<Input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
			</div>
			<DialogFooter>
				<Button onClick={async () => {
					const response = await register({
						email,
						password,
						username,
					});

					if(response?.ok) {
						await signIn(AuthProviders.Creds, {
							username: email,
							password,
						});
					}
				}}>
					Register
				</Button>
			</DialogFooter>
		</>
	);
}
