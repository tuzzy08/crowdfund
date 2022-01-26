import {
	Box,
	Container,
	Divider,
	Flex,
	Stack,
	HStack,
	Heading,
	Text,
	VStack,
	SpaceProps,
	Tag,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layouts/Layout';
import ProjectCard from '../components/cards/projectCard';
import Hero from '../components/Hero/Hero';
import { urls } from '../utils/urls';
import Crowdfunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';
import { ContractUtils } from '../utils/contractUtils';

declare let window: any;

interface IBlogTags {
	tags: Array<string>;
	marginTop?: SpaceProps['marginTop'];
}

const contractAddress = '0xEF0301D6eDFd8A3846639Fd3A5dDcb0Ab5d7e0E9';

export default function Home() {
	const [projects, setProjects] = useState([]);

	// Function to fetch all projects
	async function fetchAllProjects() {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				console.log('Please install metamask');
				return;
			}
			const provider = new ethers.providers.Web3Provider(ethereum);
			const contract = new ethers.Contract(
				contractAddress,
				Crowdfunding.abi,
				provider
			);
			const transaction = await contract.fetchAllProjects();
			setProjects(transaction);
		} catch (error) {
			throw error;
		}
	}

	// create some sample projects
	const sampleProject = async () => {
		// const value = ethers.BigNumber.from(5e18);
		// const goal = ethers.utils.formatEther(value);
		// console.log(goal)
		const data = {
			title: 'Paradox - A Mountain Bike Prototype',
			description:
				'A new patent-protected full-suspension mountain bike prototype.',
			goal: 250,
		};
		return await ContractUtils.createProject(data);
	};

	// Function to setup event listener
	function setupListener() {
		const { ethereum } = window;
		if (!ethereum) {
			console.log('Please install Metamask');
			return;
		}
		const provider = new ethers.providers.Web3Provider(ethereum);
		const contract = new ethers.Contract(
			contractAddress,
			Crowdfunding.abi,
			provider
		);
		contract.on('ProjectCreated', () => {
			fetchAllProjects();
		});

		contract.on('ProjectFunded', () => {
			fetchAllProjects();
		});
	}
	useEffect(() => {
		ContractUtils.getTokenContractAddress();
	}, []);

	useEffect(() => {
		setupListener();
	}, []);

	useEffect(() => {
		fetchAllProjects();
	}, []);

	useEffect(() => {
		// sampleProject();
	}, []);

	return (
		<Container maxW={'container.xl'}>
			<Layout />
			<Hero />
			{/* <Features /> */}
			<Box py={2}>
				<VStack spacing={2} textAlign='center'>
					<Heading as='h1' fontSize='2xl'>
						Browse available projects
					</Heading>
				</VStack>
			</Box>
			<Box py={5} mt={10} ml={3} mr={3} minH='300px'>
				<Box maxW={'7xl'} ml='auto' mr='auto'>
					<Text fontSize='2xl' color={'gray.500'} align='left'>
						Latest projects
					</Text>
					<Divider marginTop='5' />
					<Flex wrap='wrap' justifyContent='space-between'>
						{projects &&
							projects.map((project, index) => (
								<ProjectCard
									project={project}
									key={index}
									imgSrc={urls[index]}
								/>
							))}
					</Flex>
				</Box>
			</Box>
		</Container>
	);
}
