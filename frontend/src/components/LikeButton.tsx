import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import contractConfig from '../config/contract.json';

interface LikeButtonProps {
    topic: string;
    commentId: bigint;
    initialLikes: bigint;
}

export function LikeButton({ topic, commentId, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(Number(initialLikes));
    const [isLiked, setIsLiked] = useState(false); // In a real app, check if user liked from contract/graph

    const { writeContract, data: hash, isPending } = useWriteContract();

    const { isLoading: isConfirming } = useWaitForTransactionReceipt({
        hash,
    });

    const handleLike = async () => {
        if (isLiked) return;

        try {
            writeContract({
                address: contractConfig.address as `0x${string}`,
                abi: contractConfig.abi,
                functionName: 'likeComment',
                args: [topic, commentId],
            });

            // Optimistic update
            setLikes(prev => prev + 1);
            setIsLiked(true);
            toast.success('Like sent! Waiting for confirmation...');
        } catch (error) {
            console.error(error);
            toast.error('Failed to like comment');
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={isPending || isConfirming || isLiked}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-black'
                }`}
        >
            <div className="relative">
                <AnimatePresence>
                    {isLiked && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 text-red-500"
                        >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            </div>
            <span>{likes}</span>
        </button>
    );
}
