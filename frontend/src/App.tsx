import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import CommentSection from './components/CommentSection';

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex justify-end mb-6">
          <ConnectButton />
        </div>

        {isConnected ? (
          <CommentSection topic="article-001" />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-slate-600 text-lg">请先连接钱包以查看和发表评论</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
