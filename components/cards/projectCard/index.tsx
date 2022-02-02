import Image from 'next/image';
import NextLink from 'next/link';
import {
	Avatar,
	Box,
	Center,
	Divider,
	Flex,
	HStack,
	LinkBox,
	LinkOverlay,
	Text,
	Tag,
	Stack,
	SpaceProps,
	useColorModeValue,
	WrapItem,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { formatAddress } from '../../../utils/formatAddress';
declare let window: any;

export interface Project {
	projectID: number;
	title: string;
	description: string;
	projectGoal: number;
	owner: string;
	balance: string;
	funders: number;
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

export default function projectCard({ project, imgSrc }: { project: Project, imgSrc: string}) {
	let value = ethers.BigNumber.from(project.balance);
	const balance = ethers.utils.formatEther(value);
	value = ethers.BigNumber.from(project.projectGoal);
	const goal = value.toString();
	const owner = formatAddress(project.owner);
	const prjId = ethers.BigNumber.from(project.projectID).toNumber();
	
	return (
		<WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
				<LinkBox>
				<Center py={6}>
					<Box
						width={'389px'}
						height={'547px'}
						w={'full'}
						border={'1px'}
						borderColor={'gray.200'}
						bg={useColorModeValue('white', 'gray.900')}
						overflow={'hidden'}
					>
						<Stack
							spacing={2}
							h={'250px'}
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
						</Stack>
						<Flex
							mt={6}
							ml={'15px'}
							direction={'row'}
							spacing={15}
							align={'center'}
						>
							<Text
								fontWeight={600}
							>{`${balance} of ${goal} MATIC raised`}</Text>
						</Flex>
						<Center p={4}>
							<NextLink
								href={'/projects/[projectID]'}
								as={`/projects/${prjId}`}
								passHref
							>
								<LinkOverlay></LinkOverlay>
							</NextLink>
						</Center>
						<Divider />
						<Stack
							position={'relative'}
							direction={'row'}
							spacing={4}
							align={'center'}
							p={2}
						>
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
		</LinkBox>
			</WrapItem>
	);
}