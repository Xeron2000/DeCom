import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Loader2, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { useDeComConfig } from '../context/DeComContext';

interface CommentFormProps {
  topic: string;
  onSuccess?: () => void;
}

function CommentForm({ topic, onSuccess }: CommentFormProps) {
  const [content, setContent] = useState('');
  const { contractAddress, abi } = useDeComConfig();
  const { data: hash, writeContract, isPending, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Comment posted successfully!');
      setContent('');
      if (onSuccess) onSuccess();
      reset();
    }
  }, [isSuccess, onSuccess, reset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      writeContract({
        address: contractAddress,
        abi: abi,
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
    <form onSubmit={handleSubmit} className="relative mb-8">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are your thoughts?"
          className={cn(
            "w-full min-h-[120px] p-4 rounded-lg border border-accents-2 bg-background",
            "text-base placeholder:text-accents-3",
            "focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground",
            "resize-y transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          disabled={isPending || isConfirming}
        />
        <div className="absolute bottom-4 right-4">
          <button
            type="submit"
            disabled={!content.trim() || isPending || isConfirming}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium",
              "bg-foreground text-background hover:bg-accents-7 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <span className="flex items-center gap-2">
                Post Comment <Send className="w-3 h-3" />
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
