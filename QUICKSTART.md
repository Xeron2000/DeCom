# 快速开始指南

本指南将帮助您快速搭建和部署 DeCom 开发环境。

## 1. 环境准备

*   **Node.js**: >= 18.x
*   **包管理器**: pnpm (`npm i -g pnpm`)
*   **钱包**: MetaMask (需有 Sepolia 测试币)
*   **服务**: Infura/Alchemy (RPC URL) 和 WalletConnect (Project ID)

## 2. 部署流程

### 2.1 安装与配置

```bash
# 克隆并安装依赖
git clone https://github.com/Xeron2000/DeCom.git
cd DeCom
pnpm install
cd frontend && pnpm install && cd ..

# 配置环境变量
# 创建 .env 文件并填入以下内容：
# SEPOLIA_RPC_URL=https://...
# PRIVATE_KEY=... (不带 0x)
```

### 2.2 部署合约

```bash
# 编译并部署到 Sepolia
pnpm compile
pnpm deploy:sepolia
```

> 部署脚本会自动更新 `frontend/src/config/contract.json`。

### 2.3 启动前端

在使用前，请确保在 `frontend/src/config/wagmi.ts` 中填入您的 WalletConnect Project ID。

```bash
cd frontend
pnpm dev
```

访问 `http://localhost:5173` 即可体验。

## 常见问题

*   **部署失败**: 检查 RPC URL 是否有效，账户是否有足够 Sepolia ETH。
*   **钱包连接失败**: 检查 `wagmi.ts` 中的 Project ID。
*   **Nonce 错误**: 在 MetaMask 中重置账户交易记录。
