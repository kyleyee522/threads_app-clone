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
import { useEffect, useState } from 'react';

interface Props {
	postId: string;
	likes: string;
	likesCount: string;
	isLiked: boolean;
}

const LikeButton = ({ postId, likes, likesCount, isLiked }: Props) => {
	const [like, setLike] = useState(isLiked);
	// const [count, setCount] = useState(likesCount.length);

	const handleLike = async () => {
		if (like === true) {
			await unlikePost(postId, likes);
		} else {
			await likePost(postId, likes);
		}
		setLike(!like);
	};

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
			{/* <p className="mt-1 text-subtle-medium text-gray-1">
				{likesCount.length} lik{likesCount.length > 1 ? 'es' : 'e'}
			</p> */}
			{/* {count > 0 ? (
				<p className="mt-1 text-subtle-medium text-gray-1">
					{count} lik{count > 1 ? 'es' : 'e'}
				</p>
			) : (
				''
			)} */}
		</>
	);
};

export default LikeButton;
