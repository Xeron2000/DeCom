import { ConnectButton } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi';
import CommentSection from './components/CommentSection';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
          <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-full" />
                <span className="font-bold text-lg tracking-tight">DeCom</span>
              </div>
              <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
            </div>
          </header>

          <main className="max-w-2xl mx-auto px-6 py-12">
            <CommentSection topic="general-discussion" />
          </main>

          <Toaster position="bottom-right" />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
