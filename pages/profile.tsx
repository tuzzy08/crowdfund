import {
  Box,
	Container,
	Heading,
	Text,
	VStack,
	Tag,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layouts/Layout';
import Footer from '../components/Footer/Footer';
import { ContractUtils } from '../utils/contractUtils';

export default function Profile() {
  const [connectedWallet, setconnectedWallet] = useState<String>('');
  const [tokenBalance, settokenBlance] = useState<String>('');

  useEffect(() => {
    const getBalance = async function getBalance() {
      const balance = await ContractUtils.getUserCrowdTokenBalance();
      settokenBlance(balance);
    }
    try {
      getBalance();
    } catch (error) {
      console.log(error);
    }
    
  });
  
  useEffect(() => {
    const getWalletAddress = async function getWalletAddress() {
      const address: string = await ContractUtils.getConnectedWalletAddress();
      setconnectedWallet(address);
    }
    getWalletAddress();
  },[]);
  return (
		<Box>
			<Layout />
			<Container maxW='container.lg' mb={20} mt={20}>
				<VStack spacing={10}>
					<Box
						borderRadius={'50%'}
						width={'200px'}
						height={'200px'}
						bgColor={'gray.100'}
					/>
					<Box
						border={'1px'}
						width={'750px'}
						boxShadow={'md'}
						height={'140px'}
						borderRadius={'7px'}
						padding={'20px'}
					>
						<VStack alignItems={'flex-start'} spacing={4}>
							<Heading as={'h1'} size={'sm'}>
								Wallet
							</Heading>
							<Text fontWeight={'20px'}>{connectedWallet}</Text>
							<Tag size={'sm'} variant={'outline'} colorScheme={'pink'}>
								Public
							</Tag>
						</VStack>
					</Box>
					<Box
						border={'1px'}
						boxShadow={'md'}
						height={'140px'}
						width={'750px'}
						borderRadius={'7px'}
						padding={'20px'}
					>
						<VStack>
							<Heading as={'h1'} size={'md'}>
								CTK Token Balance
							</Heading>
							<Text fontSize='2xl'>{tokenBalance}</Text>
						</VStack>
					</Box>
				</VStack>
			</Container>
			<Box
				h={'350px'}
				bgImage={'/wave.svg'}
				bgRepeat={'repeat-x'}
				bgSize={'cover'}
				bgPosition={'center center'}
			></Box>
			<Footer />
		</Box>
	);
}