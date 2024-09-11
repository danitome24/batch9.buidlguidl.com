import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

// Update with your Batch number
//const BATCH_NUMBER = "1";

/**
 * Deploys a contract named "deployYourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  /*await deploy("BatchRegistry", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, BATCH_NUMBER],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const batchRegistry = await hre.ethers.getContract<Contract>("BatchRegistry", deployer);
  const batchRegistryAddress = await batchRegistry.getAddress();
  console.log("\nBatchRegistry deployed to:", batchRegistryAddress);
  console.log("Remember to update the allow list!\n");

  // Update batchRegistry storage variables.
  const myAccount = "0x97289b9C7AE16114D993057F81f99457224a59b3";
  await batchRegistry.updateAllowList([myAccount], [true]);
  await batchRegistry.transferOwnership(myAccount);
  console.log("Ownership transferred to: ", myAccount, "\n");

  // Transfer some funds to batchRegistry.
  const signer = await hre.ethers.getSigner(deployer);
  await signer.sendTransaction({
    to: batchRegistryAddress,
    value: parseEther("1.0"),
  });

  // Deploy my CheckIn contract.
  */
  const batchRegistry = await hre.ethers.getContractAt("BatchRegistry", "0x107d6F280a05f07B59039143CA21e3f917AAFA30");
  const myAccount = "0xaa4C60b784E2b3E485035399bF1b1aBDeD66A60f";
  await deploy("CheckIn", {
    from: deployer,
    //args: [batchRegistryAddress],
    args: [await batchRegistry.getAddress()],
    log: true,
    autoMine: true,
  });
  const checkIn = await hre.ethers.getContract<Contract>("CheckIn", deployer);
  console.log("CheckIn deployed to:", await checkIn.getAddress());
  await checkIn.transferOwnership(myAccount);
  console.log("Ownership transferred to: ", myAccount, "\n");

  // The GraduationNFT contract is deployed on the BatchRegistry constructor.
  //const batchGraduationNFTAddress = await batchRegistry.batchGraduationNFT();
  //console.log("BatchGraduation NFT deployed to:", batchGraduationNFTAddress, "\n");
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["BatchRegistry"];
