import { getServerSession } from '@/server/auth-options';

export default
async function HomePage() {
	const session = await getServerSession();
	return (
		<div>
			<p>
				Create
			</p>
			{session && (
				<>
					Logged in as {session.user.username}
				</>
			)}
		</div>
	);
}
