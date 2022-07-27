const getContractInstance = async (web3, contractDefinition) => {
  // get network ID and the deployed address
  const deployedAddress = contractDefinition.networks[80001].address;

  // create the instance
  const instance = new web3.eth.Contract(
    contractDefinition.abi,
    deployedAddress
  );
  return instance;
};

export default getContractInstance;
