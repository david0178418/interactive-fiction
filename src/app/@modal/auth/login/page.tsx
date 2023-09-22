import { redirect } from 'next/navigation';
import LoginForm from './login-form';
import { getServerSession } from '@/server/auth-options';

export default
async function LoginPage() {
	const session = await getServerSession();

	if(session) {
		redirect('/');
	}

	return (
		<div>
			<LoginForm/>
		</div>
	);
}
