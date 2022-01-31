import { Box, Button, Center, Container, Flex, Heading, HStack, Icon, Image, VStack, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
	IoLogoFacebook,
	IoLogoInstagram,
	IoRibbonOutline,
	IoTicketOutline,
	IoLogoTwitter,
	IoPawOutline,
} from 'react-icons/io5';
import Layout from '../components/Layouts/Layout';

export default function ProjectDetails(props: any) {
   const router = useRouter();
   const { projectID } = router.query;
  return (
		<Box>
			<Layout />
			<VStack mt={7}>
				<Heading as='h1' fontSize='3xl' border={'1px'}>
					Project title
				</Heading>
				<Text fontWeight={200} fontSize='2xl' border={'1px'}>
					Project Headline
				</Text>
				<Flex
					border={'1px'}
					wrap={'wrap'}
					w={{ base: '100%', md: '1290px' }}
					justifyContent={'space-evenly'}
					padding={1}
				>
					<Flex border={'1px'}>
						<Image
							border={'1px'}
							src='/prj3.png'
							alt='Dan Abramov'
							minW={{ base: '100%', md: '820px' }}
						/>
					</Flex>
					<VStack
						border={'1px'}
						w={'420px'}
						h={'520.500px'}
						spacing={8}
						pl={3}
						pr={3}
					>
						<Box width='95%' height='10px' bgColor={'red.400'} />
						<Flex direction={'column'}>
							<Heading as='h1' fontSize='3xl' border={'1px'} color={'red.400'}>
								MATIC: Project Balance
							</Heading>
							<Text>Remaining of goal</Text>
							<Text fontSize='3xl' alignSelf={'flex-start'} mt={10}>
								{' '}
								Number of funders
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
			<Flex
				wrap={'wrap'}
				minH={'80px'}
				justifyContent={'center'}
				mt={'60px'}
				p={10}
				bgGradient='linear(to-l, #7928CA, #FF0080)'
			>
				<Flex
					maxW={'500px'}
					justifyContent={'space-between'}
					p={'20px'}
				>
					<Icon as={IoPawOutline} color={'green.500'} w={10} h={10} mr={3} />
					<Text fontWeight={400} fontSize={'18px'}>
						Connects creators with backers to fund projects.
					</Text>
				</Flex>
				<Flex
					maxW={'500px'}
					justifyContent={'space-between'}
					p={'20px'}
				>
					<Icon as={IoRibbonOutline} color={'green.500'} w={10} h={10} mr={3} />
					<Text fontWeight={400} fontSize={'18px'}>
						Rewards aren’t guaranteed, but some contributions earn you tokens.
					</Text>
				</Flex>
				<Flex
					maxW={'500px'}
					justifyContent={'space-between'}
					p={'20px'}
				>
					<Icon as={IoTicketOutline} color={'green.500'} w={10} h={10} mr={3} />
					<Text fontWeight={400} fontSize={'18px'}>
						You’re only charged if the project meets its funding goal by the
						campaign deadline.
					</Text>
				</Flex>
			</Flex>
		</Box>
	);
}