# DeCom

[![NPM Version](https://img.shields.io/npm/v/decom-react)](https://www.npmjs.com/package/decom-react)
[![License](https://img.shields.io/npm/l/decom-react)](https://github.com/Xeron2000/DeCom/blob/main/LICENSE)

[中文文档](./README_CN.md)

**DeCom** is a blockchain-based Web3 comment system component library. It allows developers to easily integrate decentralized commenting functionality into any React application. Users log in via their wallets, and data is stored on the blockchain, ensuring immutability and permanence.

## Features

- **Out of the Box**: Ready-to-use React components for quick integration.
- **Web3 Login**: Supports mainstream wallets like MetaMask, WalletConnect, etc.
- **Decentralized Storage**: Comment data is stored directly on Ethereum (or EVM-compatible) networks.
- **Highly Customizable**: Supports custom styles and themes.
- **Responsive Design**: Perfectly adapted for both mobile and desktop devices.
- **Like System**: Built-in interaction for liking comments.

## Quick Start (NPM)

If you simply want to add commenting functionality to an existing React project, follow these steps.

### 1. Install Dependencies

```bash
npm install decom-react wagmi viem @tanstack/react-query
# OR
pnpm add decom-react wagmi viem @tanstack/react-query
```

### 2. Import Styles

Import the style file in your entry file (e.g., `main.tsx` or `App.tsx`):

```typescript
import 'decom-react/style.css';
```

### 3. Configure Provider

Wrap your application or the comment section with `DeComProvider`. You can provide a contract address (if you deployed your own) or use the default configuration.

```tsx
import { DeComProvider } from 'decom-react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ... other wagmi imports

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DeComProvider 
          contractAddress="0x..." // Optional: Your contract address
          theme="dark"            // Optional: 'light' | 'dark'
        >
          <YourPage />
        </DeComProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### 4. Use Component

Use the `CommentSection` component where you want to display comments. The `topic` prop is used to distinguish comment sections for different pages.

```tsx
import { CommentSection } from 'decom-react';

function ArticlePage() {
  return (
    <div className="article">
      <h1>My Awesome Article</h1>
      <p>Content...</p>
      
      <div className="comments-wrapper">
        <CommentSection topic="article-slug-001" />
      </div>
    </div>
  );
}
```

## Full Deployment (Self-Hosting)

If you want full control over the smart contract or wish to contribute to the code, please refer to the [Quick Start Guide](./QUICKSTART.md) for full deployment and development environment setup.

## License

This project is licensed under the [MIT License](LICENSE).

