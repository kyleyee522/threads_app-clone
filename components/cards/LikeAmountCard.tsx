// 'use client';
// import { fetchLikesCount } from '@/lib/actions/thread.action';
// import { createContext, useContext, useEffect, useState } from 'react';

// interface Props {
// 	postId: string;
// }

// const LikeAmountCard = ({ postId }: Props) => {
// 	// const LikeContext = createContext(0);
// 	const [count, setCount] = useState(0);
// 	// const likesCount = useContext(LikeContext);

// 	useEffect(() => {
// 		let fetchLikes = async () => {
// 			let likesNumber = await fetchLikesCount(postId);
// 			setCount(likesNumber);
// 		};
// 		fetchLikes();
// 	});

// 	return <>The count is {count}</>;
// };

// export default LikeAmountCard;
