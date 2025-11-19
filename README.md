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

如果您想完全掌控智能合约，或者为项目贡献代码，可以克隆本仓库进行完整部署。

### 环境要求

- Node.js >= 18
- pnpm
- Hardhat

### 1. 克隆仓库

```bash
git clone https://github.com/Xeron2000/DeCom.git
cd DeCom
```

### 2. 智能合约部署

```bash
# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入 SEPOLIA_RPC_URL 和 PRIVATE_KEY

# 编译合约
pnpm compile

# 部署到 Sepolia 测试网
pnpm deploy:sepolia
```

部署成功后，您将获得合约地址，可用于前端配置。

### 3. 前端开发

```bash
cd frontend
pnpm install
pnpm dev
```

## API 文档

### `CommentSection` Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `topic` | `string` | (Required) | 评论区的主题标识符，通常使用页面 ID 或 Slug |
| `className` | `string` | `undefined` | 自定义容器类名 |

### `DeComProvider` Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `contractAddress` | `string` | `undefined` | 智能合约地址。如果不传，需确保内部有默认 fallback |
| `theme` | `'light' \| 'dark'` | `'light'` | 主题模式 |

## 项目结构

```
DeCom/
├── contracts/              # Solidity 智能合约
│   └── CommentSystem.sol
├── scripts/               # 部署脚本
├── frontend/              # 前端组件库源码
│   ├── src/
│   │   ├── components/   # UI 组件
│   │   ├── context/      # Context Provider
│   │   └── index.ts      # 入口文件
│   └── vite.config.ts    # 构建配置
└── hardhat.config.js     # Hardhat 配置
```

## 贡献指南

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 开发路线图

- [x] 基础评论功能
- [x] 点赞功能
- [x] NPM 包发布
- [ ] 评论回复功能
- [ ] IPFS 图片上传支持
- [ ] 多链支持 (Polygon, Optimism)

## 许可证

本项目采用 [MIT 许可证](LICENSE)。
