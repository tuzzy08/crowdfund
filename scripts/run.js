const main = async () => {
	const CrowdfundContractFactory = await hre.ethers.getContractFactory(
		'Crowdfunding'
	);
	const crowdfundContract = await CrowdfundContractFactory.deploy();
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
