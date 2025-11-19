import { MessageSquare, User, Clock } from 'lucide-react';
import { Comment } from '../config/contract';
import { cn } from '../lib/utils';
import { LikeButton } from './LikeButton';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface CommentListProps {
  comments: Comment[];
  topic: string;
}

function CommentList({ comments, topic }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center glass-card rounded-xl"
      >
        <MessageSquare className="w-16 h-16 text-slate-600 mb-4" />
        <p className="text-slate-400 text-lg">暂无评论，快来发表第一条评论吧！</p>
      </motion.div>
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
      return '刚刚';
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={comment.id.toString()}
          className={cn(
            "glass-card rounded-xl p-5",
            "transition-all duration-200 hover:border-primary/30"
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5">
                <User className="w-3 h-3" />
                <span className="font-mono font-medium text-slate-300">{formatAddress(comment.author)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{formatTime(comment.timestamp)}</span>
              </div>
            </div>
          </div>

          <div className="text-slate-200 leading-relaxed whitespace-pre-wrap mb-4 pl-1">
            {comment.content}
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-white/5">
            <LikeButton
              topic={topic}
              commentId={comment.id}
              initialLikes={comment.likes}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default CommentList;
