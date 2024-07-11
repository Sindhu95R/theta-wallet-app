const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ThetaModule", (m) => {
    const batchPayment = m.contract("BatchPayment");
    return { batchPayment };
});
