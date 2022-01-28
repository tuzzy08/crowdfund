import { Box, Button, Center, Container, Flex, Heading, HStack, Icon, Image, VStack, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
	IoAnalyticsSharp,
	IoLogoBitcoin,
	IoPulseSharp,
	IoDesktop,
	IoRestaurantOutline,
	IoImagesOutline,
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
					maxW={{ base: '100%', md: '1290px' }}
					justifyContent={'space-evenly'}
					padding={1}
				>
					<Flex border={'1px'}>
						<Image border={'1px'} src='/prj3.png' alt='Dan Abramov' />
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
							<Icon as={IoRestaurantOutline} color={'green.500'} w={5} h={5} />
							<Icon as={IoRestaurantOutline} color={'green.500'} w={5} h={5} />
							<Icon as={IoRestaurantOutline} color={'green.500'} w={5} h={5} />
						</HStack>
					</VStack>
				</Flex>
			</VStack>
		</Box>
	);
}