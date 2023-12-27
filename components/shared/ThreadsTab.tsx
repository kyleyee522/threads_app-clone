import { fetchCommunityPosts } from '@/lib/actions/community.actions';
import { fetchUser, fetchUserPosts } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';

interface Props {
	currentUserId: string;
	accountId: string;
	accountType: string;
	// likes:string
	// isLiked:boolean
	userInfo: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
	let result: any;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo.onboarded) redirect('/onboarding');

	if (accountType === 'Community') {
		result = await fetchCommunityPosts(accountId);
	} else {
		result = await fetchUserPosts(accountId);
	}

	if (!result) redirect('/');

	return (
		<section className="mt-9 flex flex-col gap-10">
			{result.threads.map((thread: any) => (
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={currentUserId}
					parentId={thread.parentId}
					content={thread.text}
					author={
						accountType === 'User'
							? { name: result.name, image: result.image, id: result.id }
							: {
									name: thread.author.name,
									image: thread.author.image,
									id: thread.author.id,
								}
					}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
					likes={JSON.stringify(userInfo._id)}
					isLiked={userInfo.likedPosts.includes(thread._id)}
				/>
			))}
		</section>
	);
};

export default ThreadsTab;
