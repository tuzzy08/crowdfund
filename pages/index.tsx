import {
	Box,
	Divider,
	Flex,
	Heading,
	Text,
	VStack,
	SpaceProps,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layouts/Layout';
import ProjectCard from '../components/cards/projectCard';
import Hero from '../components/Hero/Hero';
import { urls } from '../utils/urls';
import { demo } from '../utils/sampleData';
import Crowdfunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';
import { ContractUtils } from '../utils/contractUtils';
import { Project } from '../components/cards/projectCard';
import Footer from '../components/Footer/Footer';

declare let window: any;

interface IBlogTags {
	tags: Array<string>;
	marginTop?: SpaceProps['marginTop'];
}
const contractAddress = '0x4715ba5A177ef0E2676DbB10Ed35Ff1eFaaBd957';

export default function Home() {
	let defaultState: Array<Project> = [];
	const [projects, setProjects] = useState(defaultState);
	// create some sample projects
	// const sampleProject = async () => {
	// 	demo.map(async (data) => {
	// 		await ContractUtils.createProject(data);
	// 	})		
	// };
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
			const getProjects = async () => {
				const allProjects = await ContractUtils.fetchAllProjects();
				setProjects(allProjects);
			};
			getProjects();
		});

		// contract.on('ProjectFunded', () => {
		// 	const getProjects = async () => {
		// 		const allProjects = await ContractUtils.fetchAllProjects();
		// 		setProjects(allProjects);
		// 	};
		// 	getProjects();
		// });
	}
	useEffect(() => {
		ContractUtils.getTokenContractAddress();
	}, []);

	useEffect(() => {
		setupListener();
	}, []);

	useEffect(() => {
		const getProjects = async () => {
			const allProjects = await ContractUtils.fetchAllProjects();
			setProjects(allProjects);
		}
		getProjects();
	}, []);

	useEffect(() => {
		// sampleProject();
	}, []);

	return (
		<Box>
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
				<Divider />
			</Box>
			<Box
				h={'350px'}
				bgImage={'/wave.svg'}
				bgRepeat={'repeat-x'}
				bgSize={'cover'}
				bgPosition={'center center'}
			>
			</Box>
			<Footer />
		</Box>
	);
}
