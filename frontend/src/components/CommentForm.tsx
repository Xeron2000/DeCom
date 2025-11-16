import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

interface CommentFormProps {
  topic: string;
  onSuccess: () => void;
}

function CommentForm({ topic, onSuccess }: CommentFormProps) {
  const [content, setContent] = useState('');

  const { data: hash, writeContract, isPending, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setContent('');
        onSuccess();
        reset();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onSuccess, reset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'postComment',
      args: [topic, content],
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="输入你的评论..."
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          resize: 'vertical',
        }}
        disabled={isPending || isConfirming}
      />

      <button
        type="submit"
        disabled={!content.trim() || isPending || isConfirming}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isPending || isConfirming ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isPending || isConfirming ? 'not-allowed' : 'pointer',
        }}
      >
        {isPending ? '等待确认...' : isConfirming ? '交易确认中...' : isSuccess ? '发表成功！' : '发表评论'}
      </button>

      {hash && (
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          交易哈希: {hash.slice(0, 10)}...{hash.slice(-8)}
        </div>
      )}
    </form>
  );
}

export default CommentForm;
