import {
  Box,
  Container,
  Divider,
  Flex,
	Stack,
	HStack,
  Heading,
  Image,
  Link,
	Text,
  VStack,
  Wrap,
  WrapItem,
	useColorModeValue,
	List,
	ListItem,
	ListIcon,
  Button,
  SpaceProps,
  Tag,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import Layout from '../components/Layouts/Layout';
import ProjectCard from '../components/cards/projectCard';

interface IBlogTags {
	tags: Array<string>;
	marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
	return (
		<HStack spacing={2} marginTop={props.marginTop}>
			{props.tags.map((tag) => {
				return (
					<Tag size={'md'} variant='solid' colorScheme='orange' key={tag}>
						{tag}
					</Tag>
				);
			})}
		</HStack>
	);
};

interface BlogAuthorProps {
	date: Date;
	name: string;
}

export default function Home() {
  const imgSrc =
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80';
  
  
  return (
		<>
			<Layout />
			<Box py={12}>
				<VStack spacing={2} textAlign='center'>
					<Heading as='h1' fontSize='4xl'>
						Plans that fit your need
					</Heading>
					<Text fontSize='lg' color={'gray.500'}>
						Start with 14-day free trial. No credit card needed. Cancel at
						anytime.
					</Text>
				</VStack>
			</Box>
			<Box py={5} mt={10} ml={3} mr={3} minH='300px'>
				<VStack spacing={2} textAlign='center'>
					<Container maxW={'7xl'} >
						<Text fontSize='2xl' color={'gray.500'} align='left'>
							Latest projects
						</Text>
						<Divider marginTop='5' />
						<Wrap spacing='30px' marginTop='5'>
							<Flex justify='space-evenly' paddingBottom='5px'>
								<WrapItem
									width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
								>
									<ProjectCard />
								</WrapItem>

								<WrapItem
									width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
								>
									<ProjectCard />
								</WrapItem>
								<WrapItem
									width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
								>
									<ProjectCard />
								</WrapItem>
							</Flex>
						</Wrap>
					</Container>
				</VStack>
			</Box>
		</>
	);
}
