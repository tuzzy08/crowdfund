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
import Layout from '../components/Layouts/Layout';

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

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
	return (
		<HStack marginTop='4' spacing='2' display='flex' alignItems='center'>
			<Text>By</Text>
			<Text>—</Text>
			<Text fontWeight='medium'>{props.name}</Text>
			{/* <Text>{props.date.toLocaleDateString()}</Text> */}
		</HStack>
	);
};

export default function Home() {
  return (
		<>
			<Layout />
			<Box py={12} borderColor={'blue.500'} border='1px'>
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
			<Box
				py={5}
				mt={10}
				ml={3}
				mr={3}
				minH='300px'
				borderColor='green'
				border='1px'
			>
				<VStack spacing={2} textAlign='center'>
					<Container maxW={'8xl'} centerContent>
						<Heading as='h2' border='1px' borderColor='black'>
							Latest articles
						</Heading>
						<Divider marginTop='5' />
						<Wrap spacing='30px' marginTop='5'>
							<Flex
								borderColor={'blue.500'}
								border='1px'
								justify='space-evenly'
								paddingBottom='5px'
							>
								<WrapItem
									width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
								>
									<Box w='100%'>
										<Box borderRadius='lg' overflow='hidden'>
											<Link
												textDecoration='none'
												_hover={{ textDecoration: 'none' }}
											>
												<Image
													transform='scale(1.0)'
													src={
														'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
													}
													alt='some text'
													objectFit='contain'
													width='100%'
													transition='0.3s ease-in-out'
													_hover={{
														transform: 'scale(1.05)',
													}}
												/>
											</Link>
										</Box>
										<BlogTags tags={['Engineering', 'Product']} marginTop='3' />
										<Heading fontSize='xl' marginTop='2'>
											<Link
												textDecoration='none'
												_hover={{ textDecoration: 'none' }}
											>
												Some blog title
											</Link>
										</Heading>
										<Text as='p' fontSize='md' marginTop='2' mb='5'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Lorem Ipsum has been the industry's
											standard dummy text ever since the 1500s, when an unknown
											printer took a galley of type and scrambled it to make a
											type specimen book.
										</Text>
										<Button colorScheme='teal' size='md' mt='5'>
											Fund project
										</Button>
										<BlogAuthor
											name='John Doe'
											date={new Date('2021-04-06T19:01:27Z')}
										/>
									</Box>
								</WrapItem>
								<WrapItem
									width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
								>
									<Box w='100%'>
										<Box borderRadius='lg' overflow='hidden'>
											<Link
												textDecoration='none'
												_hover={{ textDecoration: 'none' }}
											>
												<Image
													transform='scale(1.0)'
													src={
														'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
													}
													alt='some text'
													objectFit='contain'
													width='100%'
													transition='0.3s ease-in-out'
													_hover={{
														transform: 'scale(1.05)',
													}}
												/>
											</Link>
										</Box>
										<BlogTags tags={['Engineering', 'Product']} marginTop='3' />
										<Heading fontSize='xl' marginTop='2'>
											<Link
												textDecoration='none'
												_hover={{ textDecoration: 'none' }}
											>
												Some blog title
											</Link>
										</Heading>
										<Text as='p' fontSize='md' marginTop='2' mb='5'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Lorem Ipsum has been the industry's
											standard dummy text ever since the 1500s, when an unknown
											printer took a galley of type and scrambled it to make a
											type specimen book.
										</Text>
										<Button colorScheme='teal' size='md' mt='5'>
											Fund project
										</Button>
										<BlogAuthor
											name='John Doe'
											date={new Date('2021-04-06T19:01:27Z')}
										/>
									</Box>
								</WrapItem>
								<WrapItem
									width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
								>
									<Box w='100%'>
										<Box borderRadius='lg' overflow='hidden'>
											<Link
												textDecoration='none'
												_hover={{ textDecoration: 'none' }}
											>
												<Image
													transform='scale(1.0)'
													src={
														'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
													}
													alt='some text'
													objectFit='contain'
													width='100%'
													transition='0.3s ease-in-out'
													_hover={{
														transform: 'scale(1.05)',
													}}
												/>
											</Link>
										</Box>
										<BlogTags tags={['Engineering', 'Product']} marginTop='3' />
										<Heading fontSize='xl' marginTop='2'>
											<Link
												textDecoration='none'
												_hover={{ textDecoration: 'none' }}
											>
												Some blog title
											</Link>
										</Heading>
										<Text as='p' fontSize='md' marginTop='2' mb='5'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Lorem Ipsum has been the industry's
											standard dummy text ever since the 1500s, when an unknown
											printer took a galley of type and scrambled it to make a
											type specimen book.
										</Text>
										<Button colorScheme='teal' size='md' mt='5'>
											Fund project
										</Button>
										<BlogAuthor
											name='John Doe'
											date={new Date('2021-04-06T19:01:27Z')}
										/>
									</Box>
								</WrapItem>
							</Flex>
						</Wrap>
					</Container>
				</VStack>
			</Box>
		</>
	);
}
