import { ethers } from 'hardhat';
export async function deployContract(contractName: string): Promise<any> {
  if (!contractName) throw new Error('Invalid Contract Name');
  // Fetch and deploy contract
  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy();
  await contract.deployed();
  return contract;
}
