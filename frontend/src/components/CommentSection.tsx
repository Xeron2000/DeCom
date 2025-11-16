import { useReadContract } from 'wagmi';
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
    return <div style={{ textAlign: 'center', padding: '20px' }}>加载评论中...</div>;
  }

  return (
    <div>
      <h2>评论区 - {topic}</h2>

      <CommentForm topic={topic} onSuccess={handleCommentPosted} />

      <div style={{ marginTop: '30px' }}>
        <h3>所有评论 ({comments?.length || 0})</h3>
        <CommentList comments={(comments as Comment[]) || []} />
      </div>
    </div>
  );
}

export default CommentSection;
