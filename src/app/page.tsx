import LogoutButton from '@/components/logout-button';
import { getServerSession } from '@/server/auth-options';
import Link from 'next/link';

export default
async function HomePage() {
	const session = await getServerSession();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{session && (
				<>
					Logged in as {session.user.username}
					<LogoutButton/>
				</>
			)}
			{!session && (
				<>
					<Link prefetch={false} href="/auth/login">Login</Link>
					<Link prefetch={false} href="/auth/register">Register</Link>
				</>
			)}
		</main>
	);
}
