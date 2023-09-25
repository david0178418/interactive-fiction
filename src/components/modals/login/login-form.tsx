'use client';

import { AuthProviders } from '@/common/constants';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default
function LoginForm() {
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<div>
				<div className="grid w-full items-center gap-1.5 mb-5">
					<Label>Username or Email</Label>
					<Input value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} />
				</div>

				<div className="grid w-full items-center gap-1.5">
					<Label>Password</Label>
					<Input value={password} onChange={e => setPassword(e.target.value)} />
				</div>
			</div>

			<DialogFooter>
				<Button onClick={async () => {
					return signIn(AuthProviders.Creds, {
						username: usernameOrEmail,
						password,
					});
				}}>
					Login
				</Button>
			</DialogFooter>
		</>
	);
}
