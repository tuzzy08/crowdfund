import {
	Container,
	SimpleGrid,
	Image,
	Flex,
	Heading,
	Text,
	Stack,
	StackDivider,
	Icon,
	useColorModeValue,
} from '@chakra-ui/react';
import {
	IoAnalyticsSharp,
	IoLogoBitcoin,
	IoSearchSharp,
} from 'react-icons/io5';
import { ReactElement } from 'react';

interface FeatureProps {
	text: string;
	iconBg: string;
	icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
	return (
		<Stack direction={'row'} align={'center'}>
			<Flex
				w={8}
				h={8}
				align={'center'}
				justify={'center'}
				rounded={'full'}
				bg={iconBg}
			>
				{icon}
			</Flex>
			<Text fontWeight={600}>{text}</Text>
		</Stack>
	);
};

export default function SplitWithImage() {
	return (
		// <Container maxW={'5xl'} py={12}>
		// <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
		<Stack spacing={4}>			
			<Heading
				lineHeight={1.1}
				fontWeight={600}
				fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}
			>
				<Text
					as={'span'}
					position={'relative'}
					_after={{
						content: "''",
						width: 'full',
						height: '20%',
						position: 'absolute',
						bottom: 1,
						left: 0,
						bg: 'red.400',
						zIndex: -1,
					}}
				>
					Contribute
				</Text>
				<br />
				<Text as={'span'} color={'red.400'}>
					to freelance projects
				</Text>
			</Heading>
			<Stack
				spacing={4}
				divider={
					<StackDivider
						borderColor={useColorModeValue('gray.100', 'gray.700')}
					/>
				}
			>
				<Feature
					icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
					iconBg={useColorModeValue('yellow.100', 'yellow.900')}
					text={'Technology'}
				/>
				<Feature
					icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
					iconBg={useColorModeValue('green.100', 'green.900')}
					text={'Food'}
				/>
				<Feature
					icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
					iconBg={useColorModeValue('purple.100', 'purple.900')}
					text={'Fashion'}
				/>
			</Stack>
		</Stack>
		// </SimpleGrid>
		// </Container>
	);
}
