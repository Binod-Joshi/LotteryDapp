const hre  = require("hardhat");

async function main() {
  const vrfCoordinatorV2 = "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625"; // Address of VRF Coordinator
  const entranceFee = hre.ethers.parseEther("0.01"); // Example entrance fee value
  const gasLane =
    "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c"; // 150gwei
  const subscriptionId = 10543; // Example subscription ID value
  const callbackGasLimit = 50000; // Example callback gas limit value
  const interval = 300; // Example interval value in sec

  const lotteryFactory = await hre.ethers.getContractFactory("Lottery");
  const lottery = await lotteryFactory.deploy(
    vrfCoordinatorV2,
    entranceFee,
    gasLane,
    subscriptionId,
    callbackGasLimit,
    interval); //constructor value
  await lottery.waitForDeployment();

  console.log("The Lottery contract address is: ",lottery.target); //0x9b75d38a62D9D07Ad86223B16dbc15241DB9ffB1 //0xde620bDD50C756a77cA63c3C16232D173FB99A62

  console.log(hre.network.config.chainId);
  if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log(`waiting for 6 confirmation.`);
    await lottery.deploymentTransaction().wait(6);
    await verify(lottery.target, [vrfCoordinatorV2,entranceFee,gasLane,subscriptionId,callbackGasLimit,interval]);
  }

}

async function verify(contractAddress, args) {
  console.log(`verifying contract address..`);
  try {
    await hre.run(`verify:verify`, {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes(`already verified`)) {
      console.log(`Already verified`);
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
