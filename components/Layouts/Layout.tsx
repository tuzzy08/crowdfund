import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Tag,
	useColorMode,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	MoonIcon,
	SunIcon,
} from '@chakra-ui/icons';
import {
	IoCaretDownOutline,
	IoChevronDownCircleSharp,
	IoExitOutline,
	IoLockOpen,
	IoPersonSharp,
} from 'react-icons/io5';
import { formatAddress } from '../../utils/formatAddress';
declare let window: any;

export default function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const [connectedAccount, setconnectedAccount] = useState('');

  function UnconnectedWalletButton() {
    return (
			<Button
				onClick={connectWallet}
        display={{ base: 'none', md: 'inline-flex' }}
				fontSize={'sm'}
				fontWeight={600}
				color={'white'}
				bg={'pink.400'}
				href={'#'}
				_hover={{
					bg: 'pink.300',
				}}
			>
				Connect Wallet
			</Button>
		);
	}	
	function ConnectedWalletPanel() {
		const router = useRouter();
		return (
			<>
				<Menu>
						<MenuButton
							isActive={isOpen}
							as={Button}
							rightIcon={<IoCaretDownOutline />}
						>
							{connectedAccount}
						</MenuButton>
						<MenuList>
							<MenuItem icon={<IoPersonSharp />} onClick={() => router.push('/profile')}>Profile</MenuItem>
							<MenuItem
								icon={<IoLockOpen />}
								onClick={() => disconnectWallet()}
							>
								Disconnect wallet
							</MenuItem>
						</MenuList>
				</Menu>
			</>
		);
	}
  /**
   * Check if wallet is connected!
   */
  async function checkIfWalletIsConnected() {
		// Check if the browser has metamask or similar
		const { ethereum } = window;

		if (!ethereum) {
			console.log('Please install Metamask');
			return;
		} else {
			console.log('Access to ethereum is enabled');
		}
		// Get authorized account
		const accounts = await ethereum.request({ method: 'eth_accounts' });
		if (accounts.length !== 0) {
			const account = formatAddress(accounts[0]);
			setconnectedAccount(account);
			console.log('Found authorized account', account);
		} else {
			console.log('No authorized account found');
		}
	}
  /**
   * Connect a wallet
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Please install Metamask');
        return;
      }
      // Request user to authorize wallet
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length !== 0) {
        const account = formatAddress(accounts[0]);
        setconnectedAccount(account);
        console.log('connected account', account);
      }
    } catch (error) {
      console.log(error);
    }
	}
	/**
	 * Disconnect function
	 */
	function disconnectWallet() {
		return setconnectedAccount('');
	}
	
  useEffect(() => {
    checkIfWalletIsConnected();
	});
	
	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
			>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					ml={{ base: -2 }}
					display={{ base: 'flex', md: 'none' }}
				>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<NextLink href='/'>
						Logo
					</NextLink>
				<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Flex
					flex={{ base: 1, md: 0 }}
					// justify={'flex-end'}
					justifyContent={'space-between'}
				>
					<Button onClick={toggleColorMode} mr={5}>
						{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					</Button>
					{connectedAccount ? (
						<ConnectedWalletPanel />
					) : (
						<UnconnectedWalletButton />
					)}
				</Flex>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							{/* <NextLink href={navItem.href ?? '#'} passHref> */}
								<Link
									p={2}
									fontSize={'sm'}
									fontWeight={500}
									color={linkColor}
									_hover={{
										textDecoration: 'none',
										color: linkHoverColor,
									}}
								>
									{navItem.label}
								</Link>
							{/* </NextLink> */}
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<Link
			href={href}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
		>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'pink.400' }}
						fontWeight={500}
					>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}
				>
					<Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}
		>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}
			>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}
				>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}
				>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'Home',
		href: '/'
	},
	{
		label: 'Art/Design',
		children: [
			{
				label: 'Explore Art/Design',
				subLabel: 'Trending Design to inspire you',
				href: '#',
			},
			{
				label: 'New & Noteworthy',
				subLabel: 'Up-and-coming inventors',
				href: '#',
			},
		],
	},
	{
		label: 'Technology & Craft',
		children: [
			{
				label: 'Explore Technology',
				subLabel: 'Find the next cool tech',
				href: '#',
			},
			{
				label: 'Explore Craft',
				subLabel: 'Satisfy your curiosity with great art',
				href: '#',
			},
		],
	},
	{
		label: 'Start a project',
		href: '#',
	},
	// {
	// 	label: 'Hire Designers',
	// 	href: '#',
	// },
];