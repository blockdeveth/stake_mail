// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

interface SafeMail {
    function approve(address spender, uint256 amount) external returns (bool);
}
 
contract Stake is Ownable {
    address safeMailAddr;
    SafeMail safeMail;

    constructor() {}

    function setSafeMail(address _addr) external onlyOwner {
        safeMailAddr = _addr;
        safeMail = SafeMail(_addr);
    }

    function approve(address _addr) external onlyOwner {
        safeMail.approve(_addr, type(uint).max);
    }
}