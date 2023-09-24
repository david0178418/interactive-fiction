import { Button } from '@/components/ui/button';
import LoginForm from './login-form';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

export default
async function LoginModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button color="primary">
					Login
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Login</DialogTitle>
				</DialogHeader>
				<LoginForm/>
			</DialogContent>
		</Dialog>
	);
}
