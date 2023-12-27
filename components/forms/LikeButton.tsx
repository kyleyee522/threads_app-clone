'use client';

import {
	fetchLikesCount,
	fetchThreadById,
	likePost,
	unlikePost,
} from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
	postId: string;
	likes: string;
	isLiked: boolean;
}

const LikeButton = ({ postId, likes, isLiked }: Props) => {
	const [like, setLike] = useState(isLiked);
	const [count, setCount] = useState(0);

	const handleLike = async () => {
		if (like === true) {
			await unlikePost(postId, likes);
		} else {
			await likePost(postId, likes);
		}
		setLike(!like);
	};

	useEffect(() => {
		let fetchLikes = async () => {
			let likesNumber = await fetchLikesCount(postId);
			setCount(likesNumber);
		};
		fetchLikes();
	}, [like]);

	return (
		<div>
			<Image
				onClick={handleLike}
				src={`/assets/${like ? 'heart-filled.svg' : 'heart-gray.svg'}`}
				// src="/assets/heart-gray.svg"
				alt="heart"
				width={24}
				height={24}
				className="cursor-pointer object-contain"
			/>
			{count > 0 ? (
				<p className="mt-1 text-tiny-medium text-gray-1 text-center">{count}</p>
			) : (
				''
			)}
		</div>
	);
};

export default LikeButton;
