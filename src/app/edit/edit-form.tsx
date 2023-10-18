import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default
function EditForm() {

	return (
		<div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="title">Title</Label>
				<Input id="title" placeholder="title" />
			</div>
			<div className="grid w-full gap-1.5 pt-5">
				<Label htmlFor="content">Your content</Label>
				<Textarea placeholder="Type your content here." id="content" />
			</div>
		</div>
	);
}
