//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IBatchRegistry {
    function checkIn() external;

    event CheckedIn(bool wasFirstTime, address indexed user, address indexed contractAddress);
}

contract CheckIn is Ownable {
    IBatchRegistry public batchRegistry;

    constructor(address batchRegistryAddress) {
        batchRegistry = IBatchRegistry(batchRegistryAddress);
    }

    function checkIn() public onlyOwner {
        batchRegistry.checkIn();
    }
}
