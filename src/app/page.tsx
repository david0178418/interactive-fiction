import { range } from '@/common/utils';
import { StoryCard } from '@/components/story-card';

export default
async function HomePage() {
	return (
		<div className="grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
			{range(10).map(i => (
				<StoryCard
					key={i}
					story={{
						_id: '',
						title: 'foo',
						summary: 'asdfas df asdf ads f adsf as sdf',
						ownerId: '',
						ownerUsername: 'bar',
					}}
				/>
			))}
		</div>
	);
}
