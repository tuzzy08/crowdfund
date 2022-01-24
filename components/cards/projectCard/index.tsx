import Image from 'next/image';
import {
	Avatar,
	Box,
	Button,
	Center,
	Divider,
	Flex,
	HStack,
	Heading,
	Text,
	Tag,
	Stack,
	SpaceProps,
	useColorModeValue,
	WrapItem,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import TextTruncate from 'react-text-truncate';
import { formatAddress } from '../../../utils/formatAddress';
import Crowdfunding from '../../../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';

declare let window: any;
const contractAddress = '0xEF0301D6eDFd8A3846639Fd3A5dDcb0Ab5d7e0E9';

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

export default function projectCard({ project, imgSrc }) {
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
					width={'389px'}
					height={'547px'}
					w={'full'}
					border={'1px'}
					borderColor={'gray.200'}
					bg={useColorModeValue('white', 'gray.900')}
					// boxShadow={'2xl'}
					// rounded={'md'}
					// p={6}
					overflow={'hidden'}
				>
					<Stack
						spacing={2}
						h={'250px'}
						// bg={'gray.100'}
						mt={-6}
						mx={-6}
						mb={3}
						pos={'relative'}
					>
						<Image src={imgSrc} height={'250px'} width='400px' />
					</Stack>
					<Flex ml={'15px'}>
						<BlogTags tags={['Engineering', 'Product']} marginTop='1px' />
					</Flex>
					<Stack mt={'10px'} ml={'20px'} mr={'20px'}>
						<Text
							color={useColorModeValue('gray.700', 'white')}
							fontWeight={200}
							fontSize='2xl'
							fontFamily={'body'}
						>
							{project.title}
						</Text>

						{/* <Text color={'gray.500'}> */}
							{/* <TextTruncate
								line={1}
								element='span'
								truncateText='…'
								text={project.description}
								textTruncateChild={'...'}
							/> */}
						{/* </Text> */}
					</Stack>
					<Flex
						mt={6}
						ml={'15px'}
						direction={'row'}
						spacing={15}
						align={'center'}
					>
						<Text fontWeight={600}>{`${balance} of ${goal} MATIC raised`}</Text>
					</Flex>
					<Center p={4}>
						<Button colorScheme={'green'} size='md' onClick={fundProject}>
							Fund project
						</Button>
					</Center>
					<Divider />
					<Stack position={'relative'} direction={'row'} spacing={4} align={'center'} p={2}>
						<Avatar
							src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
							alt={'Author'}
						/>
						<Stack direction={'column'} spacing={0} fontSize={'sm'}>
							<Text fontWeight={600}>{`by  ${owner}`}</Text>
						</Stack>
					</Stack>
				</Box>
			</Center>
		</WrapItem>
	);
}