import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Loader2 } from 'lucide-react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

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
      toast.success('Comment posted successfully!');
      setContent('');
      onSuccess();
      reset();
    }
  }, [isSuccess, onSuccess, reset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'postComment',
        args: [topic, content],
      });
      toast.info('Please confirm the transaction in your wallet...');
    } catch (error) {
      console.error(error);
      toast.error('Failed to post comment. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What are your thoughts?"
        className={cn(
          "w-full min-h-[100px] p-4 rounded-lg border border-border bg-white",
          "text-sm placeholder:text-gray-400",
          "focus:outline-none focus:ring-1 focus:ring-black focus:border-black",
          "resize-y transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        disabled={isPending || isConfirming}
      />
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={!content.trim() || isPending || isConfirming}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium",
            "bg-black text-white transition-all hover:bg-gray-800",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <span>Post Comment</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
