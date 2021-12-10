const main = async () => {
	const crowdfundContractFactory = await hre.ethers.getContractFactory(
		'Crowdfunding'
	);
	const crowdfundContract = await crowdfundContractFactory.deploy();
	await crowdfundContract.deployed();
	console.log('Contract deployed to:', crowdfundContract.address);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
