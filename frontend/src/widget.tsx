import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './config/wagmi';
import CommentSection from './components/CommentSection';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function mount(elementId: string, topic: string) {
  const container = document.getElementById(elementId);
  if (!container) return;

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <CommentSection topic={topic} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}

// 自动初始化
if (typeof window !== 'undefined') {
  (window as any).DecentralizedComments = { mount };
}
