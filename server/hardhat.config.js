require("@nomiclabs/hardhat-ethers")
require('hardhat-deploy');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: './artifacts',
  },
  solidity: "0.8.13",
};
