# 去中心化评论系统

一个基于区块链的 Web3 评论系统，用户通过钱包登录后可以为特定主题发表和查看评论。

## 技术栈

### 后端（智能合约）
- Solidity ^0.8.20
- Hardhat
- Sepolia 测试网

### 前端
- React 18 + TypeScript
- Vite
- wagmi v2
- viem
- RainbowKit

## 快速开始

### 1. 安装依赖

```bash
# 安装合约依赖
cd decentralized-comments
pnpm install

# 安装前端依赖
cd frontend
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填入配置：

```bash
cp .env.example .env
```

需要配置：
- `SEPOLIA_RPC_URL`: 从 [Infura](https://infura.io) 或 [Alchemy](https://alchemy.com) 获取
- `PRIVATE_KEY`: 部署账户的私钥（确保有 Sepolia 测试网 ETH）

### 3. 获取测试网 ETH

从以下水龙头获取 Sepolia 测试网 ETH：
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia

### 4. 编译和部署合约

```bash
# 编译合约
pnpm compile

# 部署到 Sepolia 测试网
pnpm deploy
```

部署成功后，合约地址和 ABI 会自动保存到 `frontend/src/config/contract.json`

### 5. 配置 WalletConnect

1. 访问 https://cloud.walletconnect.com
2. 创建新项目获取 Project ID
3. 在 `frontend/src/config/wagmi.ts` 中替换 `YOUR_WALLETCONNECT_PROJECT_ID`

### 6. 启动前端

```bash
cd frontend
pnpm dev
```

访问 http://localhost:5173

## 使用说明

1. 点击 "Connect Wallet" 连接钱包（推荐使用 MetaMask）
2. 确保钱包切换到 Sepolia 测试网
3. 在评论框输入内容并点击"发表评论"
4. 在 MetaMask 中确认交易
5. 等待交易确认后，评论会自动显示在列表中

## 项目结构

```
decentralized-comments/
├── contracts/              # 智能合约
│   └── CommentSystem.sol
├── scripts/               # 部署脚本
│   └── deploy.js
├── frontend/              # 前端应用
│   ├── src/
│   │   ├── components/   # React 组件
│   │   ├── config/       # 配置文件
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── hardhat.config.js
└── package.json
```

## 智能合约说明

### CommentSystem.sol

**核心功能：**
- `postComment(topic, content)`: 发表评论
- `getComments(topic)`: 获取指定主题的所有评论

**数据结构：**
```solidity
struct Comment {
    uint256 id;
    address author;
    string content;
    uint256 timestamp;
}
```

**事件：**
```solidity
event CommentPosted(
    string indexed topic,
    address indexed author,
    string content,
    uint256 timestamp
);
```

## 部署到生产环境

### 前端部署（Vercel）

```bash
cd frontend
pnpm build
```

将 `dist` 目录部署到 Vercel 或 Netlify。

## 注意事项

⚠️ **重要提示：**
- 不要将 `.env` 文件提交到 Git
- 不要在公开代码中暴露私钥
- 测试网 ETH 仅用于测试，无实际价值
- 链上存储成本较高，评论内容建议控制在合理长度

## License

MIT
