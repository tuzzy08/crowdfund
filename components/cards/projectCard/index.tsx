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

import Crowdfunding from '../../../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';
const contractAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0';

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
					<Tag size={'md'} variant='solid' colorScheme='yellow' key={tag}>
						{tag}
					</Tag>
				);
			})}
		</HStack>
	);
};

export default function projectCard({ projectID }) {
	const fundProject = async () => {
		try {
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
			const transaction = await contract.fundProject(projectID);
			// Wait for transaction to be mined
			await transaction.wait();
		} catch (error) {}
	};
	return (
		<WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
			<Center py={6}>
				<Box
					maxW={'445px'}
					w={'full'}
					bg={useColorModeValue('white', 'gray.900')}
					boxShadow={'2xl'}
					rounded={'md'}
					p={6}
					overflow={'hidden'}
				>
					<Stack
						spacing={2}
						h={'210px'}
						// bg={'gray.100'}
						mt={-6}
						mx={-6}
						mb={6}
						pos={'relative'}
					>
						<Image
							src={
								'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
							}
							height={'210px'}
							width='445px'
						/>
						<BlogTags tags={['Engineering', 'Product']} marginTop='1px' />
					</Stack>

					<Stack>
						{/* <Text
						color={'green.500'}
						textTransform={'uppercase'}
						fontWeight={800}
						fontSize={'sm'}
						letterSpacing={1.1}
					>
						Blog
					</Text> */}
						<Heading
							color={useColorModeValue('gray.700', 'white')}
							fontSize={'2xl'}
							fontFamily={'body'}
						>
							Boost your conversion rate
						</Heading>
						<Text color={'gray.500'}>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
							nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
							erat, sed diam voluptua. At vero eos et accusam et justo duo
							dolores et ea rebum.
						</Text>
					</Stack>
					<Button colorScheme={'green'} size='md' mt='5'>
						Fund project
					</Button>
					<Stack mt={8} direction={'row'} spacing={4} align={'center'}>
						<Avatar
							src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
							alt={'Author'}
						/>
						<Stack direction={'column'} spacing={0} fontSize={'sm'}>
							<Text fontWeight={600}>By - Achim Rolle</Text>
						</Stack>
					</Stack>
				</Box>
			</Center>
		</WrapItem>
	);
}