import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { cn } from '../lib/utils';

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="输入你的评论..."
        className={cn(
          "w-full min-h-[120px] px-4 py-3 rounded-lg border border-slate-300",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "resize-vertical transition-all duration-200",
          "disabled:bg-slate-100 disabled:cursor-not-allowed"
        )}
        disabled={isPending || isConfirming}
      />

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={!content.trim() || isPending || isConfirming}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium",
            "transition-all duration-200 shadow-sm",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isSuccess
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md"
          )}
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isPending ? '等待确认...' : '交易确认中...'}
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              发表成功！
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              发表评论
            </>
          )}
        </button>

        {hash && (
          <div className="text-sm text-slate-600 font-mono">
            交易: {hash.slice(0, 10)}...{hash.slice(-8)}
          </div>
        )}
      </div>
    </form>
  );
}

export default CommentForm;
