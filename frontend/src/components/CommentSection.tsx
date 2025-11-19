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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-3 text-slate-600">加载评论中...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <CommentForm topic={topic} onSuccess={handleCommentPosted} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-sm text-slate-500 mb-4">
          {comments?.length || 0} 条评论
        </div>
        <CommentList comments={(comments as Comment[]) || []} />
      </div>
    </div>
  );
}

export default CommentSection;
