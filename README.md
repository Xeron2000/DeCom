# DeCom - 去中心化评论系统

[![NPM Version](https://img.shields.io/npm/v/decom-react)](https://www.npmjs.com/package/decom-react)
[![License](https://img.shields.io/npm/l/decom-react)](https://github.com/Xeron2000/DeCom/blob/main/LICENSE)

**DeCom** 是一个基于区块链的 Web3 评论系统组件库。它允许开发者轻松地将去中心化的评论功能集成到任何 React 应用中。用户通过钱包登录，数据存储在区块链上，确保了评论的不可篡改和永久性。

## 特性

- **开箱即用**: 提供 React 组件，快速集成。
- **Web3 登录**: 支持 MetaMask、WalletConnect 等主流钱包。
- **去中心化存储**: 评论数据直接存储在以太坊（或兼容 EVM）网络上。
- **高度可定制**: 支持自定义样式和主题。
- **响应式设计**: 完美适配移动端和桌面端。
- **点赞功能**: 内置评论点赞交互。

## 快速开始 (NPM)

如果您只想在现有的 React 项目中使用评论功能，请按照以下步骤操作。

### 1. 安装依赖

```bash
npm install decom-react wagmi viem @tanstack/react-query
# 或者
pnpm add decom-react wagmi viem @tanstack/react-query
```

### 2. 引入样式

在您的入口文件（如 `main.tsx` 或 `App.tsx`）中引入样式文件：

```typescript
import 'decom-react/style.css';
```

### 3. 配置 Provider

使用 `DeComProvider` 包裹您的应用或评论组件部分。您需要提供合约地址（如果您部署了自己的合约）或使用默认配置。

```tsx
import { DeComProvider } from 'decom-react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ... 其他 wagmi 配置导入

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DeComProvider 
          contractAddress="0x..." // 可选：您的合约地址
          theme="dark"            // 可选：'light' | 'dark'
        >
          <YourPage />
        </DeComProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### 4. 使用组件

在需要显示评论的地方使用 `CommentSection` 组件。`topic` 属性用于区分不同页面的评论区。

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

## 完整部署 (自托管)

如果您想完全掌控智能合约，或者为项目贡献代码，请参阅 [快速开始指南](./QUICKSTART.md) 进行完整部署和开发环境搭建。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。
