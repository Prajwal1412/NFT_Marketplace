// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC1155, Ownable {
    uint256 private _currentTokenId = 0;
    mapping(uint256 => NFT) private _nfts;
    mapping(address => uint256[]) private _userUnsoldNFTs;
    mapping(address => uint256[]) private _userSoldNFTs;
    mapping(address => uint256[]) private _userPurchasedNFTs;
    mapping(address => uint256[]) private _userCreatedNFTs;

    struct NFT {
        uint256 tokenId;
        address owner;
        uint256 price; //  price in Ether
        bool isSold;
        uint256 totalSupply; // Total supply of NFTs
        uint256 remainingSupply; // Remaining supply of unsold NFTs
    }

    struct NFTInfo {
        uint256 tokenId;
        address owner;
        uint256 price; //  price in Ether
        bool isSold;
        uint256 remainingAmount;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address indexed owner,
        uint256 price,
        bool sold
    );

    event NFTTransferred(
        uint256 indexed tokenId,
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() ERC1155("https://ipfs.infura.io:5001") {}

 // CREATE NFTS----------------------------------------------------------------------------------------------------------------------------------------------
function createNFT(uint256 totalSupply, uint256 priceInEther) external returns (uint256) {
    _currentTokenId++;
    _nfts[_currentTokenId] = NFT(_currentTokenId, msg.sender, priceInEther, false, totalSupply, totalSupply);
    _mint(msg.sender, _currentTokenId, totalSupply, "");

    // Add the newly created NFT to the user's unsold NFTs
    _userUnsoldNFTs[msg.sender].push(_currentTokenId);
    // Add the newly created NFT to the user's created NFTs
    _userCreatedNFTs[msg.sender].push(_currentTokenId);
    return _currentTokenId;
}
// BUY NFT------------------------------------------------------------------------------------------------------------------------------------------------------------
function buyNFT(uint256 tokenId, uint256 amount) external payable {
    require(_nfts[tokenId].remainingSupply >= amount, "Insufficient NFTs available");
    require(msg.value >= _nfts[tokenId].price * amount, "Insufficient funds");
    require(_nfts[tokenId].owner != address(0), "Token doesn't exist");
     require(_nfts[tokenId].owner != msg.sender, "Cannot buy your own NFT");
    _nfts[tokenId].remainingSupply -= amount; // Update the remaining supply
    address previousOwner = _nfts[tokenId].owner;
    address newOwner = msg.sender;

    // Transfer the NFT
    _safeTransferFrom(previousOwner, newOwner, tokenId, amount, "");

    if (_nfts[tokenId].remainingSupply > 0) {
        // If there are remaining unsold NFTs, mark them as unsold
        _nfts[tokenId].isSold = false;

      // Update the user's unsold NFTs
uint256[] storage unsoldNFTs = _userUnsoldNFTs[previousOwner];
uint256 remainingUnsold = _nfts[tokenId].totalSupply - _nfts[tokenId].remainingSupply;

// Remove the sold NFTs from the user's unsold NFTs
for (uint256 i = 0; i < unsoldNFTs.length; i++) {
    if (unsoldNFTs[i] == tokenId) {
        unsoldNFTs[i] = unsoldNFTs[unsoldNFTs.length - 1];
        unsoldNFTs.pop();
        break;
    }
}

// Add the remaining unsold NFTs back to the user's unsold NFTs
for (uint256 i = 0; i < remainingUnsold; i++) {
    // Check if tokenId is not already in the list before adding
    bool tokenIdAlreadyInList = false;
    for (uint256 j = 0; j < unsoldNFTs.length; j++) {
        if (unsoldNFTs[j] == tokenId) {
            tokenIdAlreadyInList = true;
            break;
        }
    }

    // Add tokenId to the list only if it's not already present
    if (!tokenIdAlreadyInList) {
        _userUnsoldNFTs[previousOwner].push(tokenId);
    }
}

    }

    // Add the purchased NFT to the user's purchased NFTs
    _userPurchasedNFTs[newOwner].push(tokenId);
    // Add the sold NFT to the seller's sold NFTs
    _userSoldNFTs[previousOwner].push(tokenId);
}


// FETCH PURCHASED NFTS----------------------------------------------------------------------------------------------------------------------------------------------
    function fetchPurchasedNFTs() external view returns (NFTInfo[] memory) {
        uint256[] memory purchasedNFTs = _userPurchasedNFTs[msg.sender];
        NFTInfo[] memory nftInfos = new NFTInfo[](purchasedNFTs.length);

        for (uint256 i = 0; i < purchasedNFTs.length; i++) {
            uint256 tokenId = purchasedNFTs[i];
            nftInfos[i] = NFTInfo(
                tokenId,
                _nfts[tokenId].owner,
                _nfts[tokenId].price,
                _nfts[tokenId].isSold,
                _nfts[tokenId].totalSupply - _nfts[tokenId].remainingSupply
            );
        }

        return nftInfos;
    }

// FETCH CREATED NFTS----------------------------------------------------------------------------------------------------------------------------------------------
    function fetchCreatedNFTs() external view returns (NFTInfo[] memory) {
        uint256[] memory createdNFTs = _userCreatedNFTs[msg.sender];
        NFTInfo[] memory nftInfos = new NFTInfo[](createdNFTs.length);

        for (uint256 i = 0; i < createdNFTs.length; i++) {
            uint256 tokenId = createdNFTs[i];
            nftInfos[i] = NFTInfo(
                tokenId,
                _nfts[tokenId].owner,
                _nfts[tokenId].price,
                _nfts[tokenId].isSold,
                _nfts[tokenId].remainingSupply
            );
        }

        return nftInfos;
    }

// FETCH SOLD NFTS----------------------------------------------------------------------------------------------------------------------------------------------
    function fetchSoldNFTs() external view returns (NFTInfo[] memory) {
        uint256[] memory soldNFTs = _userSoldNFTs[msg.sender];
        NFTInfo[] memory nftInfos = new NFTInfo[](soldNFTs.length);

        for (uint256 i = 0; i < soldNFTs.length; i++) {
            uint256 tokenId = soldNFTs[i];
            nftInfos[i] = NFTInfo(
                tokenId,
                _nfts[tokenId].owner,
                _nfts[tokenId].price,
                _nfts[tokenId].isSold,
                _nfts[tokenId].totalSupply - _nfts[tokenId].remainingSupply
            );
        }

        return (nftInfos);
    }

// FETCH UNSOLD NFTS----------------------------------------------------------------------------------------------------------------------------------------------
   
    function fetchUnsoldNFTs() external view returns (NFTInfo[] memory) {
        uint256[] memory UnsoldNFTs = _userUnsoldNFTs[msg.sender];
        NFTInfo[] memory nftInfos = new NFTInfo[](UnsoldNFTs.length);

        for (uint256 i = 0; i < UnsoldNFTs.length; i++) {
            uint256 tokenId = UnsoldNFTs[i];
            nftInfos[i] = NFTInfo(
                tokenId,
                _nfts[tokenId].owner,
                _nfts[tokenId].price,
                _nfts[tokenId].isSold,
                _nfts[tokenId].remainingSupply
            );
        }

        return (nftInfos);
    }
  

// FETCH LISTED NFTS----------------------------------------------------------------------------------------------------------------------------------------------
    function fetchListedNFTs() external view returns (NFTInfo[] memory) {
        uint256[] memory listedNFTs = new uint256[](_currentTokenId);
        uint256 index = 0;

        for (uint256 i = 1; i <= _currentTokenId; i++) {
            if (!_nfts[i].isSold) {
                listedNFTs[index] = i;
                index++;
            }
        }

        NFTInfo[] memory nftInfos = new NFTInfo[](index);

        for (uint256 i = 0; i < index; i++) {
            uint256 tokenId = listedNFTs[i];
            nftInfos[i] = NFTInfo(
                tokenId,
                _nfts[tokenId].owner,
                _nfts[tokenId].price,
                _nfts[tokenId].isSold,
                _nfts[tokenId].remainingSupply
            );
        }

        return nftInfos;
    }
}