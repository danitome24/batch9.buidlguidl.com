//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Metadata {
    string public s_name;
    uint8 public s_red;
    uint8 public s_green;
    uint8 public s_blue;

    constructor(string memory name, uint8 red, uint8 green, uint8 blue) {
        s_name = name;
        s_red = red;
        s_green = green;
        s_blue = blue;
    }

    function getName() external view returns (string memory) {
        return s_name;
    }

    function getColor() external view returns (uint8, uint8, uint8) {
        return (s_red, s_green, s_blue);
    }
}
