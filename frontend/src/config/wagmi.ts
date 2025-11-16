import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: '去中心化评论系统',
  projectId: 'a0102e60a2c629516f87a7a1b15e867a', // 从 https://cloud.walletconnect.com 获取
  chains: [sepolia],
  ssr: false,
});
