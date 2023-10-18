import { Paths } from '@/common/constants';
import { getServerSession } from '@/server/auth-options';
import { redirect } from 'next/navigation';
import EditForm from './edit-form';

export default
async function EditPage() {
	const session = await getServerSession();
	if (!session) {
		redirect(Paths.Home);
	}

	return (
		<div>
			<EditForm />
		</div>
	);
}
