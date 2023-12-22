import CommunityCard from '@/components/cards/CommunityCard';
import UserCard from '@/components/cards/UserCard';
import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import SuggestCommunityCard from '../cards/SuggestCommunityCard';
import SuggestUserCard from '../cards/SuggestUserCard';

async function RightSidebar() {
	const user = await currentUser();
	if (!user) return null;
	// fetch users
	const userResult = await fetchUsers({
		userId: user.id,
		searchString: '',
		pageNumber: 1,
		pageSize: 25,
	});

	// fetch communities
	const communityResult = await fetchCommunities({
		searchString: '',
		pageNumber: 1,
		pageSize: 25,
	});
	return (
		<section className="custom-scrollbar rightsidebar">
			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-light-1">
					Suggested Communities
				</h3>
				<div className="mt-14 flex flex-col gap-9">
					{communityResult.communities.length === 0 ? (
						<p className="no-result">No users</p>
					) : (
						<>
							{communityResult.communities.slice(0, 2).map((community) => (
								<SuggestCommunityCard
									key={community.id}
									id={community.id}
									name={community.name}
									username={community.username}
									imgUrl={community.image}
									bio={community.bio}
									members={community.members}
								/>
							))}
						</>
					)}
				</div>
			</div>
			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
				<div className="mt-14 flex flex-col gap-9">
					{userResult.users.length === 0 ? (
						<p className="no-result">No users</p>
					) : (
						<>
							{userResult.users.slice(0, 3).map((person) => (
								<SuggestUserCard
									key={person.id}
									id={person.id}
									name={person.name}
									username={person.username}
									imgUrl={person.image}
									personType="User"
								/>
							))}
						</>
					)}
				</div>
			</div>
		</section>
	);
}

export default RightSidebar;
