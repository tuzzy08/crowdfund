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
    <>
      <Layout />
      <Container>
        <Box>Image</Box>
        <Footer />
      </Container>
    </>
  )
}