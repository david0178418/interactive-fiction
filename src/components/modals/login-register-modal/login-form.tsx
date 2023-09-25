'use client';

import { AuthProviders } from '@/common/constants';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default
function LoginForm() {
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');
	const { refresh } = useRouter();
	const { toast } = useToast();

	return (
		<>
			<div>
				<div className="grid w-full items-center gap-1.5 mb-5">
					<Label>Username or Email</Label>
					<Input value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} />
				</div>

				<div className="grid w-full items-center gap-1.5 mb-5">
					<Label>Password</Label>
					<Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
				</div>
			</div>

			<DialogFooter>
				<Button onClick={async () => {
					const loginResponse = await signIn(AuthProviders.Creds, {
						username: usernameOrEmail,
						password,
						redirect: false,
					});

					if(loginResponse?.error) {
						toast({ title: 'Login failed' });
					} else {
						refresh();
					}
				}}>
					Login
				</Button>
			</DialogFooter>
		</>
	);
}
