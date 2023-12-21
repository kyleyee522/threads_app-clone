'use client';

import {
	fetchThreadById,
	likePost,
	unlikePost,
} from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';

interface Props {
	postId: string;
	likes: string;
}

const LikeButton = ({ postId, likes }: Props) => {
	const [like, setLike] = useState(false);

	// const user = await currentUser();
	// if (!user) return null;

	// const userInfo = await fetchUser(user.id);
	// if (!userInfo.onboarded) redirect('/onboarding');
	// const thread = await fetchThreadById(params.id);

	const handleLike = async () => {
		if (like === true) {
			await unlikePost(postId, likes);
		} else {
			await likePost(postId, likes);
		}
		setLike(!like);
	};

	// const test = await likePost();

	return (
		<>
			<Image
				onClick={handleLike}
				src={`/assets/${like ? 'heart-filled.svg' : 'heart-gray.svg'}`}
				// src="/assets/heart-gray.svg"
				alt="heart"
				width={24}
				height={24}
				className="cursor-pointer object-contain"
			/>
		</>
	);
};

export default LikeButton;
