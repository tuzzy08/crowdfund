import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Crowdfunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';
import { Project } from '../components/cards/projectCard';
const contractAddress = '0x4715ba5A177ef0E2676DbB10Ed35Ff1eFaaBd957';

declare let window: any;

interface ProjectParams {
	title: string;
	description: string;
	goal: number;
}

export const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
			infuraId: '27e484dcd9e3efcfd25a83a78777cdf1', // required
		},
	},
};
// Get contract instance from ABI
export async function getContractInstance() {	
	const { ethereum } = window;
	let provider;
	if (!ethereum) {
		const web3Modal = new Web3Modal({
			providerOptions, // required
		});
		const instance = await web3Modal.connect();
		provider = new ethers.providers.Web3Provider(instance);
	}
	provider = new ethers.providers.Web3Provider(ethereum);
	const contract = new ethers.Contract(
		contractAddress,
		Crowdfunding.abi,
		provider
	);
	return contract;
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
    // Wait for transaction to be mined
    await transaction.wait();
  } catch (error) {
    throw error;
  }
};
  
// Function to retrieve token contract address
async function getTokenContractAddress() {
	try {
		const contract = await getContractInstance();
		const tokenContractAdrdress = await contract.getTokenContractAddress();
		console.log(tokenContractAdrdress);
			} catch (error) {
				console.log(error);
			}
};

// Function to fetch individual projects
async function fetchProject(id: string): Promise<Project | any> {
	try {
		const contract = await getContractInstance();	
		const transaction = await contract.fetchProjectByID(id);
		return transaction;
} catch (error) {
		console.log(error);
}
}

// Function to fetch all projects
async function fetchAllProjects(): Promise<Array<Project>> {
const contract = await getContractInstance();
	const transaction = await contract.fetchAllProjects();
	if (!transaction) {
		console.log('No projects to return');
		return [];
	}
return transaction;
}

// Function to fetch user token balance
async function getUserCrowdTokenBalance(): Promise<String> {
	// Check if the browser has metamask or similar
	const contract = await getContractInstance();
	// Get connected wallet address
	const userAddress = await getConnectedWalletAddress();
	// NOTE: Specify a caller so that the right balance can be returned
	// otherwise it returns a null address due to how Alchemy works 
	// with Message Calls
	const transaction = await contract.getUserCrowdTokenBalance({
		from: userAddress,
	});
	// Format the token figure
	const value = ethers.utils.formatEther(ethers.BigNumber.from(transaction));	
	return value.toString();
}

  
	
	
export const ContractUtils = {
	createProject,
	fundProject,
	getConnectedWalletAddress,
	getTokenContractAddress,
	fetchProject,
	fetchAllProjects,
	getUserCrowdTokenBalance,
};
