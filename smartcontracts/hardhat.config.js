require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.20",
    networks:{
        theta: {
            url:'https://eth-rpc-api-testnet.thetatoken.org/rpc',
            accounts:[vars.get("PRIVATE_KEY")],
            chainId:365
        }
    }
};
