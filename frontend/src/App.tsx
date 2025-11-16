import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import CommentSection from './components/CommentSection';

function App() {
  const { isConnected } = useAccount();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1>去中心化评论系统</h1>
        <div style={{ marginTop: '20px' }}>
          <ConnectButton />
        </div>
      </header>

      {isConnected ? (
        <CommentSection topic="article-001" />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          请先连接钱包以查看和发表评论
        </div>
      )}
    </div>
  );
}

export default App;
