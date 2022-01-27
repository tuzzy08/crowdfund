import { ethers } from 'ethers';
import Crowdfunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';
import { Project } from '../components/cards/projectCard';
const contractAddress = '0xEF0301D6eDFd8A3846639Fd3A5dDcb0Ab5d7e0E9';

declare let window: any;

interface ProjectParams {
	title: string;
	description: string;
	goal: number;
}
// Function to create new project
async function createProject(options: ProjectParams) {
		const { ethereum } = window;
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				contractAddress,
				Crowdfunding.abi,
				signer
			);
			try {
				let listingFee = await contract.getListingFee();
				listingFee = listingFee.toString();
				const transaction = await contract.createProject(
					options.title,
					options.description,
					options.goal,
					{
						value: listingFee,
					}
				);
				await transaction.wait();
			} catch (error) {
				console.log(error);
			}
		}
};
	
// Function to fund a project
const fundProject = async function fundProject(projectID: number) {
  const { ethereum } = window;
  if (!ethereum) {
    console.log('Please install Metamask');
    return;
  }
  // Get blockchain provider
  const provider = new ethers.providers.Web3Provider(ethereum);
  // get authorized account to sign transactions
  const signer = provider.getSigner();
  // Fetch the contract from chain - Passing in contract address, contract_abi, provider
  const contract = new ethers.Contract(
    contractAddress,
    Crowdfunding.abi,
    signer
  );
  
  
  try {
    const transaction = await contract.fundProject(projectID, {
      value: '500000000000000000',
    });
    // Wait for transaction to be mined
    await transaction.wait();
  } catch (error) {
    throw error;
  }
};
  
// Function to retrieve token contract address
async function getTokenContractAddress() {
		const { ethereum } = window;
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const contract = new ethers.Contract(
				contractAddress,
				Crowdfunding.abi,
				provider
			);
			try {
				const tokenContractAdrdress = await contract.getTokenContractAddress();
				console.log(tokenContractAdrdress);
			} catch (error) {
				console.log(error);
			}
		}
};

// Function to fetch all projects
async function fetchAllProjects(): Promise<Array<Project>> {
try {
	const { ethereum } = window;
	if (!ethereum) {
		console.log('Please install metamask');
		return [];
	}
	const provider = new ethers.providers.Web3Provider(ethereum);
	const contract = new ethers.Contract(
		contractAddress,
		Crowdfunding.abi,
		provider
	);
	const transaction = await contract.fetchAllProjects();
	return transaction;
} catch (error) {
	throw error;
}
}

  
	
	
export const ContractUtils = {
	createProject,
	fundProject,
	getTokenContractAddress,
	fetchAllProjects,
};
