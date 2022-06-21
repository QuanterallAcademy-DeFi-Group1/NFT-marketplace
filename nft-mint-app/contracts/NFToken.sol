// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFToken is ERC20, Ownable {
    uint256 private mintCount;
    uint256 public price;
    constructor() ERC20("NFToken", "NFT") {
        mintCount = 0;
        price = 100000000000000000;
    }

    function mint(address account, uint256 amount) onlyOwner external returns(bool) {
        _mint(account, amount);

        mintCount++;

        if(mintCount % 100 == 0){
            price *= 2;
        }else{
            price += price * 1/100;
        }

        return true;
    }

    function burn(address account, uint256 amount) onlyOwner external returns(bool) {
        require(balanceOf(account) > 0, "Not enough balance");

        _burn(account, amount);
        return true;
    }
}