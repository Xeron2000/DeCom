const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("=== 检查网络连接和账户状态 ===\n");

  try {
    // 1. 检查 RPC URL
    console.log("1. RPC URL:", process.env.SEPOLIA_RPC_URL ? "已配置" : "❌ 未配置");

    // 2. 检查私钥
    console.log("2. 私钥:", process.env.PRIVATE_KEY ? "已配置" : "❌ 未配置");

    // 3. 测试网络连接
    console.log("\n3. 测试网络连接...");
    const provider = hre.ethers.provider;
    const network = await provider.getNetwork();
    console.log("   ✓ 网络连接成功");
    console.log("   Chain ID:", network.chainId.toString());

    // 4. 获取区块号
    const blockNumber = await provider.getBlockNumber();
    console.log("   当前区块高度:", blockNumber);

    // 5. 检查账户
    console.log("\n4. 检查部署账户...");
    const [deployer] = await hre.ethers.getSigners();
    console.log("   账户地址:", deployer.address);

    // 6. 检查余额
    const balance = await provider.getBalance(deployer.address);
    const balanceInEth = hre.ethers.formatEther(balance);
    console.log("   账户余额:", balanceInEth, "ETH");

    if (parseFloat(balanceInEth) < 0.01) {
      console.log("   ⚠️  警告: 余额可能不足，建议至少 0.01 ETH");
      console.log("   获取测试币: https://sepoliafaucet.com");
    } else {
      console.log("   ✓ 余额充足");
    }

    // 7. 估算 gas 价格
    console.log("\n5. 当前 Gas 价格...");
    const feeData = await provider.getFeeData();
    console.log("   Gas Price:", hre.ethers.formatUnits(feeData.gasPrice, "gwei"), "Gwei");

    console.log("\n=== 所有检查完成 ===");

  } catch (error) {
    console.error("\n❌ 错误:", error.message);
    if (error.message.includes("could not detect network")) {
      console.log("\n可能的原因:");
      console.log("1. RPC URL 无效或无法访问");
      console.log("2. 网络连接问题");
      console.log("3. RPC 提供商限流");
    }
  }
}

main().catch(console.error);
