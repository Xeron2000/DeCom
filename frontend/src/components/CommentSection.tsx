import { useReadContract } from 'wagmi';
import { Loader2 } from 'lucide-react';
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
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Discussion</h2>
        <CommentForm topic={topic} onSuccess={handleCommentPosted} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {comments?.length || 0} Comments
          </h3>
        </div>
        <CommentList comments={(comments as Comment[]) || []} topic={topic} />
      </section>
    </div>
  );
}

export default CommentSection;
