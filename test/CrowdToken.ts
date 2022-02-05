import { ethers } from 'hardhat';
import { expect } from 'chai';

// Contract Type
import { CrowdToken } from '../types/CrowdToken';

// Types
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// Testing the Token contract
describe('Testing CrowdToken Contract', () => {
  // Local Variables
  let TokenContractFactory;
  let Token: CrowdToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  // Deploy Contract and get signers and address 
  beforeEach(async () => {
    TokenContractFactory = await ethers.getContractFactory('CrowdToken');
    [owner, addr1, addr2] = await ethers.getSigners();
    // Deploy contract
    Token = await TokenContractFactory.deploy();
  });

  // Testing Deployment of the contract
  describe('Testing Deployment of the contract', () => {
    it('Should assign the right owner', async () => {
			expect(await Token.owner()).to.equal(owner.address);
		});

    it('Should assign the total supply of tokens to the owner', async function () {
			const ownerBalance = await Token.balanceOf(owner.address);
			expect(await Token.totalSupply()).to.equal(ownerBalance);
		});
  });
});