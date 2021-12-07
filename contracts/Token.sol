// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor () ERC20("CROWD TOKEN", "CTK"){
        _mint(msg.sender, 500000);
    }

    function mintTo(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}