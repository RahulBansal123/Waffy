const Waffy = artifacts.require('Waffy');
const NFT = artifacts.require('NFT');

module.exports = function (deployer) {
  deployer.deploy(Waffy);
  deployer.deploy(NFT);
};
