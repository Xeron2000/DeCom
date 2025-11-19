import { MessageSquare, User, Clock } from 'lucide-react';
import { Comment } from '../config/contract';
import { cn } from '../lib/utils';

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <MessageSquare className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-slate-500 text-lg">暂无评论，快来发表第一条评论吧！</p>
      </div>
    );
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString('zh-CN');
  };

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <div
          key={comment.id.toString()}
          className={cn(
            "bg-white rounded-lg shadow-sm border border-slate-200",
            "p-5 transition-all duration-200 hover:shadow-md hover:border-slate-300"
          )}
        >
          <div className="flex items-center gap-3 mb-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-mono font-medium">{formatAddress(comment.author)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatTimestamp(comment.timestamp)}</span>
            </div>
          </div>
          <div className="text-slate-800 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
