'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { LogOutIcon } from 'lucide-react';

export default
function LogoutButton() {
	return (
		<Button className="font-bold w-full" onClick={() => signOut()}>
			<LogOutIcon className="h-5 w-5 mr-1" /> Logout
		</Button>
	);
}
