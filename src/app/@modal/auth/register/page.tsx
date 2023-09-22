import { redirect } from 'next/navigation';
import { getServerSession } from '@/server/auth-options';
import RegisterForm from './register-form';

export default
async function RegisterPage() {
	const session = await getServerSession();

	if(session) {
		redirect('/');
	}

	return (
		<div>
			<RegisterForm/>
		</div>
	);
}
