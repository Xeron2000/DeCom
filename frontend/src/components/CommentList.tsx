import { Comment } from '../config/contract';

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        暂无评论，快来发表第一条评论吧！
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
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id.toString()}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            <strong>{formatAddress(comment.author)}</strong>
            <span style={{ marginLeft: '10px' }}>{formatTimestamp(comment.timestamp)}</span>
          </div>
          <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
            {comment.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
