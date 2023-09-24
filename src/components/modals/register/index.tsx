import { Button } from '@/components/ui/button';
import RegisterForm from './register-form';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

export default
async function RegisterModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">Register</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Register</DialogTitle>
				</DialogHeader>
				<RegisterForm/>
				<DialogFooter>
					asdfasdfsd
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
