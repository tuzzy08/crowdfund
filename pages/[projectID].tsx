import { Box, Center, Container, Flex, Heading, HStack, Image, VStack, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
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
					<Flex border={'1px'} w={'420px'} h={'520.500px'} justifyContent={'center'}>
						<Box width='95%' height='10px' bgColor={'red.400'} />
					</Flex>
				</Flex>
			</VStack>
		</Box>
	);
}