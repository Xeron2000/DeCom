// 部署后自动生成的合约配置
// 运行 pnpm deploy 后会自动更新此文件

export const CONTRACT_ADDRESS = '0x20eFe3c5D0749c533CAe196c2d1452f10Fa87304' as const;

export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_topic", "type": "string" },
      { "internalType": "string", "name": "_content", "type": "string" }
    ],
    "name": "postComment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_topic", "type": "string" }
    ],
    "name": "getComments",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "address", "name": "author", "type": "address" },
          { "internalType": "string", "name": "content", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct CommentSystem.Comment[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "string", "name": "topic", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "author", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "content", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "CommentPosted",
    "type": "event"
  }
] as const;

export interface Comment {
  id: bigint;
  author: string;
  content: string;
  timestamp: bigint;
}
