import { Container, HStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layouts/Layout';

export default function ProjectDetails(props: any) {
   const router = useRouter();
   const { projectID } = router.query;
  return (
		<Container>
      <Layout />
      <HStack>

      </HStack>
      
		</Container>
	);
}