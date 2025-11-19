# 快速开始指南

本指南将帮助您快速搭建和部署 DeCom 去中心化评论系统。

## 前置准备

### 1. 安装必要工具
- **Node.js**: 18.x 或更高版本
- **pnpm**: 推荐使用 pnpm 管理依赖 (`npm install -g pnpm`)
- **MetaMask**: 浏览器钱包插件

### 2. 获取必要的密钥和账户

#### 2.1 获取 Sepolia 测试网 RPC URL
推荐使用 Infura 或 Alchemy 获取 Sepolia 测试网的 RPC 节点地址。

#### 2.2 准备部署账户
在 MetaMask 中创建一个新的测试账户，并导出其私钥。
**注意：私钥仅用于测试，请勿在生产环境中使用主账户私钥。**

#### 2.3 获取测试网 ETH
访问 Sepolia 水龙头（如 Sepolia Faucet）获取测试代币，用于支付部署和交互的 Gas 费用。

#### 2.4 获取 WalletConnect Project ID
访问 WalletConnect Cloud 注册并创建项目，获取 Project ID 以支持钱包连接功能。

---

## 部署步骤

### 步骤 1: 安装依赖

```bash
# 进入项目目录
cd DeCom

# 安装合约依赖
pnpm install

# 安装前端依赖
cd frontend
pnpm install
cd ..
```

### 步骤 2: 配置环境变量

在项目根目录创建 `.env` 文件，并填入以下配置：

```env
# Sepolia 测试网 RPC URL
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID

# 部署账户私钥（不要包含 0x 前缀）
PRIVATE_KEY=your_private_key_here
```

### 步骤 3: 编译智能合约

```bash
pnpm compile
```

### 步骤 4: 部署智能合约到 Sepolia

```bash
pnpm deploy:sepolia
```

部署成功后，控制台将输出合约地址。请务必记录该地址，后续前端配置将需要使用。

### 步骤 5: 配置前端

编辑 `frontend/src/config/wagmi.ts` 文件，填入您的 WalletConnect Project ID：

```typescript
export const config = getDefaultConfig({
  appName: '去中心化评论系统',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [sepolia],
  ssr: false,
});
```

### 步骤 6: 启动前端应用

```bash
cd frontend
pnpm dev
```

访问 `http://localhost:5173` 即可看到运行中的应用。

---

## 验证与测试

1. 确保 MetaMask 已切换至 Sepolia 测试网。
2. 点击页面上的 "Connect Wallet" 连接钱包。
3. 尝试发表一条评论，并在 MetaMask 中确认交易。
4. 等待交易确认后，评论应立即显示在列表中。

---

## 常见问题

### 部署失败 (insufficient funds)
请检查部署账户是否有足够的 Sepolia ETH。

### 交易失败 (nonce too low)
在 MetaMask 设置中重置账户交易历史。

### 前端无法连接钱包
检查 `wagmi.ts` 中的 Project ID 是否正确。

---

## Gas 费用估算

- **部署合约**: 约 0.01-0.02 ETH
- **发表评论**: 约 0.0005-0.001 ETH
