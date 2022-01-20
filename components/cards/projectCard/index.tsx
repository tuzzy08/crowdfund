import Image from 'next/image';
import {
	Avatar,
  Box,
  Button,
  HStack,
	Center,
	Heading,
  Text,
  Tag,
  Stack,
  SpaceProps,
	useColorModeValue,
	WrapItem,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { formatAddress } from '../../../utils/formatAddress';
import Crowdfunding from '../../../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';
const contractAddress = '0x8C91093Cef625ed1Ab15cDb12FB132f1Cb92c571';

interface Project {
	projectID: number;
	title: string;
	description: string;
	projectGoal: number;
	owner: string;
	balance: string;
}

interface IBlogTags {
	tags: Array<string>;
	marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
	return (
    <HStack
      spacing={2}
      marginTop={props.marginTop}
      paddingLeft='4px'
		>
			{props.tags.map((tag) => {
				return (
					<Tag size={'md'} variant='solid' colorScheme='blue' key={tag}>
						{tag}
					</Tag>
				);
			})}
		</HStack>
	);
};

export default function projectCard({ project }) {
	let value = ethers.BigNumber.from(project.balance);
	const balance = ethers.utils.formatEther(value);
	value = ethers.BigNumber.from(project.projectGoal);
	const goal = value.toString();
	const owner = formatAddress(project.owner);

	// Function to fund a project
	const fundProject = async () => {
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
		let id = ethers.BigNumber.from(project.projectID);
		let prjId = id.toNumber();
		
		try {
			const transaction = await contract.fundProject(prjId, {
				value: '500000000000000000',
			});
			// Wait for transaction to be mined
			await transaction.wait();
		} catch (error) {
			throw error;
		}
	};

	
	return (
		<WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
			<Center py={6}>
				<Box
					maxW={'389px'}
					maxH={'547px'}
					w={'full'}
					bg={useColorModeValue('white', 'gray.900')}
					boxShadow={'2xl'}
					rounded={'md'}
					p={6}
					overflow={'hidden'}
				>
					<Stack
						spacing={2}
						h={'250px'}
						// bg={'gray.100'}
						mt={-6}
						mx={-6}
						mb={6}
						pos={'relative'}
					>
						<Image
							src={
								'/prj1.png'
							}
							height={'250px'}
							width='400px'
						/>
						<BlogTags tags={['Engineering', 'Product']} marginTop='1px' />
					</Stack>
					<Stack>
						<Heading
							color={useColorModeValue('gray.700', 'white')}
							fontSize={'2xl'}
							fontFamily={'body'}
						>
							{project.title}
						</Heading>
						<Text color={'gray.500'}>{project.description}</Text>
					</Stack>
					<Stack mt={6} direction={'row'} spacing={15} align={'center'}>
						<Text fontWeight={600}>Goal</Text>
						<Text fontWeight={600} color={'green.500'}>
							{balance} of {''}
						</Text>
						<Text fontWeight={600} color={'green.500'}>
							{' '}
							{goal} MATIC
						</Text>
					</Stack>
					<Center pt={2}>
						<Button colorScheme={'green'} size='md' mt='5' onClick={fundProject}>
						Fund project
					</Button>
					</Center>
					
					{/*  */}
					<Stack mt={6} direction={'row'} spacing={4} align={'center'}>
						<Avatar
							src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
							alt={'Author'}
						/>
						<Stack direction={'column'} spacing={0} fontSize={'sm'}>
							<Text fontWeight={600}>By - {owner}</Text>
						</Stack>
					</Stack>
				</Box>
			</Center>
		</WrapItem>
	);
}