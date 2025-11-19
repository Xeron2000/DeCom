import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { useDeComConfig } from '../context/DeComContext';

interface LikeButtonProps {
    topic: string;
    commentId: bigint;
    initialLikes: bigint;
    isLiked?: boolean; // Currently the contract doesn't track if user liked, so this is optimistic or external
}

export function LikeButton({ topic, commentId, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const { contractAddress, abi } = useDeComConfig();
    const { data: hash, writeContract, isPending } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isSuccess) {
            setLikes((prev) => prev + 1n);
            toast.success('Comment liked!');
        }
    }, [isSuccess]);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();

        writeContract({
            address: contractAddress,
            abi: abi,
            functionName: 'likeComment',
            args: [topic, commentId],
        });
    };

    return (
        <button
            onClick={handleLike}
            disabled={isPending || isConfirming}
            className={cn(
                "flex items-center gap-1.5 text-xs font-medium transition-colors",
                "text-accents-5 hover:text-foreground",
                (isPending || isConfirming) && "opacity-50 cursor-not-allowed"
            )}
        >
            {isPending || isConfirming ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
                <Heart className="w-3.5 h-3.5" />
            )}
            <span>{likes.toString()}</span>
        </button>
    );
}
