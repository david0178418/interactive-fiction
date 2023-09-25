import { getServerSession } from '@/server/auth-options';

export default
async function HomePage() {
	const session = await getServerSession();
	return (
		<div className="min-h-screen items-center justify-between">
			<p>
				Landing
			</p>
			{session && (
				<>
					Logged in as {session.user.username}
				</>
			)}
		</div>
	);
}
