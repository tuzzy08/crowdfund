require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
// require('@nomiclabs/hardhat-etherscan');

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: '0.8.4',
	// paths: {
	// 	artifacts: './pages/artifacts',
	// },
	networks: {
		rinkeby: {
			url: process.env.PROD_ALCHEMY_KEY,
			accounts: [process.env.PRIVATE_KEY],
		},
	},
};
