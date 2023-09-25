'use client';
import { Button } from '@/components/ui/button';
import { TabsList } from '@radix-ui/react-tabs';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Tabs,
	TabsContent,
	TabsTrigger,
} from '@/components/ui/tabs';
import RegisterForm from './register-form';
import LoginForm from './login-form';
import { LogOutIcon } from 'lucide-react';

export default
function LoginRegisterModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button color="primary" className="font-bold">
					Login/Register <LogOutIcon className="h-5 w-5 ml-1" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<Tabs>
					<TabsList className="grid w-full grid-cols-2 mb-10">
						<TabsTrigger value="login">
							<DialogHeader>
								<DialogTitle>Login</DialogTitle>
							</DialogHeader>
						</TabsTrigger>
						<TabsTrigger value="register">
							<DialogHeader>
								<DialogTitle>Register</DialogTitle>
							</DialogHeader>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<LoginForm/>
					</TabsContent>
					<TabsContent value="register">
						<RegisterForm/>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
