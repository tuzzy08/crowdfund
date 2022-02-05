import { expect, assert } from 'chai';
import { ethers } from 'hardhat';

// Contract types
import { Crowdfunding } from '../types/Crowdfunding';
import { CrowdToken } from '../types/CrowdToken';

// Types
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe('Testing Crowdfunding contract', () => {
  // Local variables
  let CrowdfundingContractFactory;
  let CrowdfundingContract: Crowdfunding;
  let TokenContractAddress: string;
  let TokenContract: CrowdToken;
	let owner: SignerWithAddress;
	let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async () => {
    CrowdfundingContractFactory = await ethers.getContractFactory('Crowdfunding');
    [owner, addr1, addr2] = await ethers.getSigners();
    // Deploy contract which in turn deploys Token contract
    CrowdfundingContract = await CrowdfundingContractFactory.deploy();
    // Get Token contract address
    TokenContractAddress = await CrowdfundingContract.getTokenContractAddress();
  });
  

  describe('Testing deployment', () => {
    it('Should be the owner of token contract', async () => { 
      // Get Token contract instance
       TokenContract = await ethers.getContractAt(
					'CrowdToken',
					TokenContractAddress
				);
      expect(CrowdfundingContract.address).to.equal(await TokenContract.owner());
    });
  })
  

});