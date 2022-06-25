// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

import "./NFToken.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error MintPriceNotMet(uint256 price);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();

contract Market is ReentrancyGuard, ERC20 {
    struct Listing {
        uint256 price;
        address seller;
    }

   event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    using Counters for Counters.Counter;
    Counters.Counter private mintCount;
    uint256 public initialMintCost;
    address public currentNftAddress;
    mapping(address => mapping(uint256 => Listing)) private s_listings;
    mapping(address => uint256) private s_proceeds;

    constructor(uint256 _initialMintCost, uint256 _initialSupply, string memory _tokenName, string memory _tokenSymbol ) ERC20(_tokenName,_tokenSymbol)
    {
        _mint(msg.sender, _initialSupply);
        initialMintCost = _initialMintCost;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }

    modifier notListed(address nftAddress, uint256 tokenId, address owner) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isOwner( address nftAddress, uint256 tokenId, address spender) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    function listItem(address nftAddress, uint256 tokenId, uint256 price) external notListed(nftAddress, tokenId, msg.sender) isOwner(nftAddress, tokenId, msg.sender) {
        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }
        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }
        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    function cancelListing(address nftAddress, uint256 tokenId) external isOwner(nftAddress, tokenId, msg.sender) isListed(nftAddress, tokenId) {
        delete(s_listings[nftAddress][tokenId]);
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    function buyItem(address nftAddress, uint256 tokenId) external payable isListed(nftAddress, tokenId) nonReentrant {
        Listing memory item = s_listings[nftAddress][tokenId];

        if(msg.value < item.price) {
            revert PriceNotMet(nftAddress, tokenId, item.price);
        }

        s_proceeds[item.seller] += msg.value;
        delete(s_listings[nftAddress][tokenId]);
        IERC721(nftAddress).safeTransferFrom(item.seller, msg.sender, tokenId);
        emit ItemBought(msg.sender, nftAddress, tokenId, item.price);
    }

    function updateItem(address nftAddress, uint256 tokenId, uint256 newPrice) external isListed(nftAddress, tokenId) nonReentrant isOwner(nftAddress, tokenId, msg.sender) {
        if(newPrice == 0) {
            revert PriceMustBeAboveZero();
        }

        s_listings[nftAddress][tokenId].price = newPrice;
        emit ItemListed(msg.sender, nftAddress, tokenId, newPrice);
    }

    function withdrawProceeds() external {
        uint256 proceeds = s_proceeds[msg.sender];
        if (proceeds <= 0) {
            revert NoProceeds();
        }
        s_proceeds[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        require(success, "Transfer failed");
    }

    function getListing(address nftAddress, uint256 tokenId) external view returns (Listing memory) {
        return s_listings[nftAddress][tokenId];
    }

    function getProceeds(address seller) external view returns (uint256) {
        return s_proceeds[seller];
    }

    function mintNft(string memory tokenUri, uint256 tokenCount) public {
        uint256 currentMintPrice = getCurrentMintPrice();
        if (tokenCount < currentMintPrice) {
            revert MintPriceNotMet(currentMintPrice);
        }
        IERC20(address(this)).transferFrom(msg.sender, address(this), tokenCount);
        NFToken(currentNftAddress).mint(tokenUri, msg.sender);
        mintCount.increment();
    }

    function getCurrentMintPrice() public view returns (uint256) {
        uint256 mintedNftsCount = mintCount.current();
        uint256 extraAddition = initialMintCost / 100;
 
        return initialMintCost + extraAddition * mintedNftsCount;
    }

    function getCurrentNftAddress () public view returns(address) {
        return currentNftAddress;
    }
}