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
  let TokenFactory;
  let TokenContract: CrowdToken;
	let owner: SignerWithAddress;
	let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  

  describe('Testing deployment', () => {

  })
  

});