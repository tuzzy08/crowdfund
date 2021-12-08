import Image from 'next/image';
import {
  Box,
  Button,
  HStack,
	Center,
	Heading,
  Text,
  Tag,
  Stack,
  SpaceProps,
	Avatar,
	useColorModeValue,
} from '@chakra-ui/react';

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

export default function projectCard() {
	return (
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
						erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
						et ea rebum.
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
					<Stack
						direction={'column'}
						spacing={0}
						fontSize={'sm'}
					>
						<Text fontWeight={600}>By - Achim Rolle</Text>
					</Stack>
				</Stack>
			</Box>
		</Center>
	);
}