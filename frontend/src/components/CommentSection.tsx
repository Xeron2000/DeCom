import { useReadContract } from 'wagmi';
import { Loader2 } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CONTRACT_ADDRESS, CONTRACT_ABI, Comment } from '../config/contract';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentSectionProps {
  topic: string;
}

function CommentSection({ topic }: CommentSectionProps) {
  const { data: comments, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getComments',
    args: [topic],
  });

  const handleCommentPosted = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-accents-3 mb-4" />
        <p className="text-accents-4">Loading discussions...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      {/* Microservice Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold tracking-tight">Discussion</h2>
        <ConnectButton
          showBalance={false}
          chainStatus="icon"
          accountStatus="avatar"
        />
      </div>

      <CommentForm topic={topic} onSuccess={handleCommentPosted} />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-accents-2">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          {comments?.length || 0} Comments
        </h3>
      </div>

      <CommentList comments={(comments as Comment[]) || []} topic={topic} />
    </div>
  );
}

export default CommentSection;
