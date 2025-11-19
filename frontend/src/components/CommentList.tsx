import { User, Clock } from 'lucide-react';
import { Comment } from '../config/contract';
import { cn } from '../lib/utils';
import { LikeButton } from './LikeButton';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface CommentListProps {
  comments: Comment[];
  topic: string;
}

function CommentList({ comments, topic }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-accents-2 rounded-lg">
        <p className="text-accents-5 text-lg font-medium">No comments yet</p>
        <p className="text-sm text-accents-4 mt-1">Be the first to share your thoughts!</p>
      </div>
    );
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (timestamp: bigint) => {
    try {
      return formatDistanceToNow(new Date(Number(timestamp) * 1000), {
        addSuffix: true,
        locale: zhCN
      });
    } catch (e) {
      return 'Just now';
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id.toString()}
          className={cn(
            "border border-accents-2 rounded-lg p-6 bg-background",
            "hover:border-accents-4 transition-colors duration-200"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accents-2 to-accents-3 flex items-center justify-center">
                <User className="w-4 h-4 text-accents-6" />
              </div>
              <div>
                <div className="font-mono font-medium text-foreground text-sm">
                  {formatAddress(comment.author)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-accents-4">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(comment.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-foreground leading-relaxed whitespace-pre-wrap mb-4 pl-11 text-base">
            {comment.content}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-accents-2 pl-11">
            <LikeButton
              topic={topic}
              commentId={comment.id}
              initialLikes={comment.likes}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
