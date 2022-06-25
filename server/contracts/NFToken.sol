// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFToken is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    address marketAddress;
    constructor(address market) ERC721("NFToken", "NFT") {
        marketAddress = market;
    }

    modifier onlyMarket (address minter) {
        require(minter == marketAddress, "Only this NFT's market cant mint it");
        _;
    }

    function mint(string memory tokenUri, address toMint) public onlyMarket(msg.sender) returns(bool) {
        _tokenId.increment();
        uint256 newId = _tokenId.current();
        _mint(toMint, newId);
        _setTokenURI(newId, tokenUri);

        return true;
    }
}