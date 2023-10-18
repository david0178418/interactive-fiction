/**
 * Partially taken from v0 by Vercel page
 * @see https://v0.dev/t/4Sx7Rt7
 */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { getServerSession } from '@/server/auth-options';
import LogoutButton from '@/components/logout-button';
import LoginRegisterModal from '@/components/modals/login-register-modal';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import {
	CalendarDaysIcon, FlameIcon, PenSquareIcon,
} from 'lucide-react';
import { Paths } from '@/common/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Choose Your Own Adventure',
	description: 'Just a Choose Your Own Adventure Site',
};

interface Props {
	children: ReactNode;
}

export default
async function RootLayout(props: Props) {
	const { children } = props;
	const session = await getServerSession();

	return (<html lang="en">
		<body className={`${inter.className} h-screen w-full flex flex-col md:flex-row`}>
			<nav className="w-full md:w-64 bg-gray-800 text-white p-5">
				<h1 className="text-2xl mb-5">CYOA</h1>
				<ul className="space-y-2">
					<li>
						<Link className="flex items-center gap-3 py-2" href={Paths.Home}>
							<FlameIcon className="h-5 w-5"/>
							<span>Hot</span>
						</Link>
					</li>
					<li>
						<Link className="flex items-center gap-3 py-2" href={Paths.Home}>
							<CalendarDaysIcon className="h-5 w-5"/>
							<span>New</span>
						</Link>
					</li>
					<li>
						<Link className="flex items-center gap-3 py-2" href={Paths.StoryEdit}>
							<PenSquareIcon className="h-5 w-5"/>
							<span>Write</span>
						</Link>
					</li>
					<li>
						<div className="flex items-center gap-3 py-2">
							{session && (
								<LogoutButton />
							)}
							{!session && (
								<LoginRegisterModal />
							)}
						</div>
					</li>
				</ul>
			</nav>
			<main className="flex-1 p-5">
				{children}
			</main>
			<Toaster />
		</body>
	</html>
	);
}
