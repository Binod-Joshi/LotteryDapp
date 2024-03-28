require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations:1,
    },
    // sepolia: {
    //   chainId: 11155111,
    //   blockConfirmations: 6,

    // }
  }
};
