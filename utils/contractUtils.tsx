import { ethers } from 'ethers';
import Crowdfunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';
import { Project } from '../components/cards/projectCard';
const contractAddress = '0xC5CEFb5870C1E50c3281D49B8CC0DFCb01dC525e';

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

// Function to get connected wallet address
async function getConnectedWalletAddress(): Promise<string> {
	// Check if the browser has metamask or similar
	const { ethereum } = window;
	if (!ethereum) {
		throw new Error('Please install Metamask');
	} 
	// Get authorized account
	const accounts = await ethereum.request({ method: 'eth_accounts' });
	if (accounts.length === 0) {
		throw new Error('Please connect wallet to Metamask');
	}
	return accounts[0];
}
	
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
		console.log('*')
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

// Function to fetch individual projects
async function fetchProject(id: string): Promise<Project | any> {
try {
	const { ethereum } = window;
	if (!ethereum) {
		console.log('Please install metamask');
		return null;
	}
	const provider = new ethers.providers.Web3Provider(ethereum);
	const contract = new ethers.Contract(
		contractAddress,
		Crowdfunding.abi,
		provider
	);
	const transaction = await contract.fetchProjectByID(id);
	return transaction;
} catch (error) {
	throw error;
}
}

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
	getConnectedWalletAddress,
	getTokenContractAddress,
	fetchProject,
	fetchAllProjects,
};
