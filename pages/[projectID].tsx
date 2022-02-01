import { Box, Button, Center, Container, Flex, Heading, HStack, Icon, Image, VStack, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
	IoLogoFacebook,
	IoLogoInstagram,
	IoRibbonOutline,
	IoTicketOutline,
	IoLogoTwitter,
	IoPawOutline,
} from 'react-icons/io5';
import { Divider, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Layout from '../components/Layouts/Layout';
import Footer from '../components/Footer/Footer';
import { ContractUtils } from '../utils/contractUtils';
import { Project } from '../components/cards/projectCard';
import { urls } from '../utils/urls';

interface Details {
	title: string;
	description: string;
	balance: number;
	funders: number;
	owner: string;
}
export default function ProjectDetails(props: any) {
	const [project, setProject] = useState<Details>({
		title: '',
		description: '',
		owner: '',
		balance: 0,
		funders: 0,
	});
	const router = useRouter();
	let id: any = router.query.projectID;
	id = id.toString();
	useEffect(() => {
		// Fetching the project
		const getProject = async () => {
			const currentProject: Project = await ContractUtils.fetchProject(id);
			const details: Details = {
				title: currentProject.title,
				description: currentProject.description,
				balance: ethers.BigNumber.from(currentProject.balance).toNumber(),
				funders: ethers.BigNumber.from(currentProject.funders).toNumber(),
				owner: currentProject.owner,
			};
			console.log(details)
			setProject({ ...project, ...details });
		}
		getProject();
	},[]);
  return (
		<Box>
			<Layout />
			<VStack mt={10} spacing={3}>
				<Heading as='h1' fontSize='3xl'>
					{project.title}
				</Heading>
				<Text fontWeight={200} fontSize='2xl' pb={5}>
					{project.description}
				</Text>
				<Flex
					wrap={'wrap'}
					w={{ base: '100%', md: '1290px' }}
					justifyContent={'space-evenly'}
					padding={1}
				>
					<Flex>
						<Image
							src={`${urls[parseInt(id) - 1]}`}
							alt='Dan Abramov'
							minW={{ base: '100%', md: '820px' }}
						/>
					</Flex>
					<VStack w={'420px'} h={'520.500px'} spacing={8} pl={3} pr={3}>
						<Box width='95%' height='10px' bgColor={'red.400'} />
						<Flex direction={'column'}>
							<Heading as='h1' fontSize='3xl' color={'red.400'}>
								MATIC: {project.balance}
							</Heading>
							<Text>Remaining of goal</Text>
							<Text fontSize='3xl' alignSelf={'flex-start'} mt={10}>
								{' '}
								Number of funders: {project.funders}
							</Text>
							<Text fontSize='3xl' alignSelf={'flex-start'} mt={10} mb={10}>
								{' '}
								Remaining time
							</Text>
						</Flex>
						<Button width={'90%'}>Fund project</Button>
						<HStack spacing={5}>
							<Icon as={IoLogoFacebook} color={'blue.500'} w={5} h={5} />
							<Icon as={IoLogoInstagram} color={'blue.500'} w={5} h={5} />
							<Icon as={IoLogoTwitter} color={'blue.500'} w={5} h={5} />
						</HStack>
					</VStack>
				</Flex>
			</VStack>
			{/* Gradient Banner */}
			<Flex
				wrap={'wrap'}
				minH={'80px'}
				justifyContent={'center'}
				mt={'120px'}
				p={10}
				bgGradient='linear(to-l, #7928CA, #FF0080)'
			>
				<Flex maxW={'500px'} justifyContent={'space-between'} p={'20px'}>
					<Icon as={IoPawOutline} color={'green.500'} w={10} h={10} mr={3} />
					<Text fontWeight={400} fontSize={'18px'}>
						Connects creators with backers to fund projects.
					</Text>
				</Flex>
				<Flex maxW={'500px'} justifyContent={'space-between'} p={'20px'}>
					<Icon as={IoRibbonOutline} color={'green.500'} w={10} h={10} mr={3} />
					<Text fontWeight={400} fontSize={'18px'}>
						Rewards aren’t guaranteed, but some contributions earn you tokens.
					</Text>
				</Flex>
				<Flex maxW={'500px'} justifyContent={'space-between'} p={'20px'}>
					<Icon as={IoTicketOutline} color={'green.500'} w={10} h={10} mr={3} />
					<Text fontWeight={400} fontSize={'18px'}>
						You’re only charged if the project meets its funding goal by the
						campaign deadline.
					</Text>
				</Flex>
			</Flex>
			{/* Project's Description Tab */}
			<VStack mt='30px' mb='100px'>
				<Tabs width={'76vw'}>
					<TabList>
						<Tab>Description</Tab>
						<Tab>Updates</Tab>
						<Tab>Contact</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>one!</p>
						</TabPanel>
						<TabPanel>
							<p>two!</p>
						</TabPanel>
						<TabPanel>
							<p>three!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
				<Divider />
			</VStack>

			<Footer />
		</Box>
	);
}
/**
 * Note: NextJS dynamic routes that are statically generated lose their query parameters
 * as this is fetched after hydration. As a result if the page is refreshed it results in 
 * an error. So this page is optimised for server side rendering to able to access the route
 * parameters which is available only after hydration.
 * @param context 
 * @returns 
 */
export async function getServerSideProps(context: object) {
	return {
		props: {},
	};
}