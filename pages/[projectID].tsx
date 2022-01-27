import { Box, Center, Container, Heading, VStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layouts/Layout';

export default function ProjectDetails(props: any) {
   const router = useRouter();
   const { projectID } = router.query;
  return (
		<Box>
			<Layout />
			<VStack mt={7}>
				<Heading as='h1' fontSize='3xl'>
					Project title
				</Heading>
				<Text fontWeight={200} fontSize='2xl'>
					Project Headline
				</Text>
			</VStack>
		</Box>
	);
}