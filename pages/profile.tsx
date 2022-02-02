import {
	Box,
	Container,
	Divider,
	Flex,
	Stack,
	HStack,
	Heading,
	Text,
	VStack,
	SpaceProps,
	Tag,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layouts/Layout';
import Footer from '../components/Footer/Footer';
import Crowdfunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';

export default function Profile() {
  return (
		<Box>
			<Layout />
			<Container maxW='container.lg'>
        <Box border={'1px'} borderRadius={'50%'} width={'200px'} height={'200px'}>Image</Box>
        <Box width={'500px'} height={'300px'} border={'1px'}></Box>
			</Container>
			<Footer />
		</Box>
	);
}