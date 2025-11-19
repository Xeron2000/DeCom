# Quick Start Guide

[中文文档](./QUICKSTART_CN.md)

This guide will help you quickly set up and deploy the DeCom development environment.

## 1. Prerequisites

*   **Node.js**: >= 18.x
*   **Package Manager**: pnpm (`npm i -g pnpm`)
*   **Wallet**: MetaMask (with Sepolia testnet ETH)
*   **Services**: Infura/Alchemy (RPC URL) and WalletConnect (Project ID)

## 2. Deployment Process

### 2.1 Installation & Configuration

```bash
# Clone and install dependencies
git clone https://github.com/Xeron2000/DeCom.git
cd DeCom
pnpm install
cd frontend && pnpm install && cd ..

# Configure environment variables
# Create a .env file and fill in the following:
# SEPOLIA_RPC_URL=https://...
# PRIVATE_KEY=... (without 0x)
```

### 2.2 Deploy Contract

```bash
# Compile and deploy to Sepolia
pnpm compile
pnpm deploy:sepolia
```

> The deployment script will automatically update `frontend/src/config/contract.json`.

### 2.3 Start Frontend

Before starting, please ensure you have filled in your WalletConnect Project ID in `frontend/src/config/wagmi.ts`.

```bash
cd frontend
pnpm dev
```

Visit `http://localhost:5173` to experience the application.

## Troubleshooting

*   **Deployment Failed**: Check if the RPC URL is valid and if the account has enough Sepolia ETH.
*   **Wallet Connection Failed**: Check the Project ID in `wagmi.ts`.
*   **Nonce Error**: Reset the account transaction history in MetaMask.
