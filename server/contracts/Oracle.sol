//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

contract MockOracle {
    uint256 private price;

    constructor() {
        price = 10000000000000000;
    }

    function getLatestPrice() public view returns (uint256) {
        return price;
    }

    function setPrice(uint256 _price) external {
        price = _price;
    }
}