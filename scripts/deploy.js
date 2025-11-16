const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("正在部署 CommentSystem 合约...");

  // 获取部署账户信息
  const [deployer] = await hre.ethers.getSigners();
  console.log("部署账户:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("账户余额:", hre.ethers.formatEther(balance), "ETH");

  console.log("\n开始编译和部署...");
  const CommentSystem = await hre.ethers.getContractFactory("CommentSystem");

  console.log("发送部署交易...");
  const commentSystem = await CommentSystem.deploy();

  console.log("等待交易确认...");
  console.log("交易哈希:", commentSystem.deploymentTransaction().hash);

  await commentSystem.waitForDeployment();
  const address = await commentSystem.getAddress();

  console.log(`CommentSystem 部署成功！`);
  console.log(`合约地址: ${address}`);

  // 保存合约地址和 ABI
  const contractInfo = {
    address: address,
    abi: JSON.parse(commentSystem.interface.formatJson())
  };

  const outputDir = path.join(__dirname, "../frontend/src/config");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, "contract.json"),
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("合约信息已保存到 frontend/src/config/contract.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
