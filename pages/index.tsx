import {
  Box,
  Container,
  Divider,
  Flex,
	Stack,
	HStack,
  Heading,
  Image,
  Link,
	Text,
  VStack,
  Wrap,
  WrapItem,
	useColorModeValue,
	List,
	ListItem,
	ListIcon,
  Button,
  SpaceProps,
  Tag,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layouts/Layout';
import ProjectCard from '../components/cards/projectCard';
import Crowdfunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';
interface IBlogTags {
	tags: Array<string>;
	marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
	return (
		<HStack spacing={2} marginTop={props.marginTop}>
			{props.tags.map((tag) => {
				return (
					<Tag size={'md'} variant='solid' colorScheme='orange' key={tag}>
						{tag}
					</Tag>
				);
			})}
		</HStack>
	);
};

interface BlogAuthorProps {
	date: Date;
	name: string;
}
const contract_address = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0';

export default function Home() {
	const [projects, setProjects] = useState([]);
	// Function to create new project
	const createProject = async(title, desc, goal) => {
		const { ethereum } = window;
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				contract_address,
				Crowdfunding.abi,
				signer
			);
			const transaction = await contract.createProject(title, desc, goal);
			await transaction.wait();
		}
	};
	const fetchAllProjects = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				console.log('Please install metamask');
				return;
			}

			const provider = new ethers.providers.Web3Provider(ethereum);
			const contract = new ethers.Contract(contract_address, Crowdfunding.abi, provider);
			const transaction = await contract.fetchAllProjects();
			setProjects(transaction);
			console.log(transaction);
		} catch (error) {
			throw error;
		}
	};
	useEffect(() => {
		fetchAllProjects();
	});
  
  return (
		<>
			<Layout />
			<Box py={12}>
				<VStack spacing={2} textAlign='center'>
					<Heading as='h1' fontSize='4xl'>
						Plans that fit your need
					</Heading>
					<Text fontSize='lg' color={'gray.500'}>
						Start with 14-day free trial. No credit card needed. Cancel at
						anytime.
					</Text>
				</VStack>
			</Box>
			<Box py={5} mt={10} ml={3} mr={3} minH='300px'>
				<VStack spacing={2} textAlign='center'>
					<Container maxW={'7xl'}>
						<Text fontSize='2xl' color={'gray.500'} align='left'>
							Latest projects
						</Text>
						<Divider marginTop='5' />
						<Wrap spacing='30px' marginTop='5'>
							<Flex justify='space-evenly' paddingBottom='5px'>
								{projects &&
									projects.map((project, index) => (
										<ProjectCard projectID={project.projectID} key={ index } />
									))}
							</Flex>
						</Wrap>
					</Container>
				</VStack>
			</Box>
		</>
	);
}
