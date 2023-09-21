import Link from 'next/link';

export default
function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link prefetch={false} href="/auth/register">Register</Link>
			{/* <Link href="/auth/login">Login</Link> */}
		</main>
	);
}
