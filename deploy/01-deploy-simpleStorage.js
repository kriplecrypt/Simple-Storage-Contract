const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const { ContractFactory } = require("ethers");
const { network } = require("hardhat");

const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;

  const { deployer } = await getNamedAccounts();

  // const Contract = await deployments.get("SimpleStorage");

  //     ethUsdPriceFeedAddress = ethUsdAggregator.address;
  //   } else {
  //     ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  //   }
  log("Deploying contract and waiting for confirmations....");

  const SimpleStorage = await deploy("SimpleStorage", {
    //arguments
    from: deployer,
    args: [],
    logs: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log(`SimpleStorage deployed at ${SimpleStorage.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(SimpleStorage.address, []);
  }
};
module.exports.tags = ["all", "SimpleStorage"];
