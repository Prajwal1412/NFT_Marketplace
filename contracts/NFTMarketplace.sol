// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
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
        uint256 price;
        bool isSold;
        uint256 remainingAmount; // New field to track remaining NFTs
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
//CREATE NFTS-----------------------------------------------------------------------------
    function createNFT(uint256 amount, uint256 price) external returns (uint256) {
        _currentTokenId++;
        _nfts[_currentTokenId] = NFT(_currentTokenId, msg.sender, price * 1 ether, false, amount);
        _mint(msg.sender, _currentTokenId, amount, "");

        listNFTForSale(_currentTokenId, price);

        // Add the newly created NFT to the user's unsold NFTs
        _userUnsoldNFTs[msg.sender].push(_currentTokenId);
        // Add the newly created NFT to the user's created NFTs
        _userCreatedNFTs[msg.sender].push(_currentTokenId);
        return _currentTokenId;
    }

    function listNFTForSale(uint256 tokenId, uint256 price) private {
        require(_nfts[tokenId].owner == msg.sender, "Only the owner can list the NFT for sale");
        require(!_nfts[tokenId].isSold, "NFT is already sold");

        _nfts[tokenId].price = price * 1 ether;
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            price,
            false
        );
    }
//FETCH PURCHASED NFT's------------------------------------------------------------------------------------------------
    function fetchPurchasedNFTs() external view returns (uint256[] memory) {
        return _userPurchasedNFTs[msg.sender];
    }
//FETCH CREATEDNFT's------------------------------------------------------------------------------------------------

    function fetchCreatedNFTs() external view returns (uint256[] memory) {
        return _userCreatedNFTs[msg.sender];
    }
//ALL NFT's------------------------------------------------------------------------------
function fetchListedNFTs() external view returns (uint256[] memory) {
    uint256[] memory listedNFTs = new uint256[](_currentTokenId);

    uint256 index = 0;
    for (uint256 i = 1; i <= _currentTokenId; i++) {
        if (!_nfts[i].isSold) {
            listedNFTs[index] = i;
            index++;
        }
    }

    // Resize the array to remove empty elements
    assembly {
        mstore(listedNFTs, index)
    }

    return listedNFTs;
}



//BUY NFT------------------------------------------------------------------------------------------
function buyNFT(uint256 tokenId, uint256 amount) external payable {
    require(_nfts[tokenId].remainingAmount >= amount, "Insufficient NFTs available");
    require(msg.value >= _nfts[tokenId].price * amount, "Insufficient funds");
    require(_nfts[tokenId].owner != address(0), "Token doesn't exist");

    _nfts[tokenId].remainingAmount -= amount; // Update the remaining amount
    address previousOwner = _nfts[tokenId].owner;
    address newOwner = msg.sender;

    // Transfer the NFT
    _safeTransferFrom(previousOwner, newOwner, tokenId, amount, "");

    if (_nfts[tokenId].isSold) {
        // If the NFT was previously sold, add the amount to the remaining amount
        _nfts[tokenId].remainingAmount += amount;
    } else {
        // If it's the first sale, mark it as sold
        _nfts[tokenId].isSold = true;
        // Remove the sold NFT from the user's unsold NFTs
        uint256[] storage unsoldNFTs = _userUnsoldNFTs[previousOwner];
        for (uint256 i = 0; i < unsoldNFTs.length; i++) {
            if (unsoldNFTs[i] == tokenId) {
                unsoldNFTs[i] = unsoldNFTs[unsoldNFTs.length - 1];
                unsoldNFTs.pop();
                break;
            }
        }
    }

    // Add the purchased NFT to the user's purchased NFTs
    _userPurchasedNFTs[newOwner].push(tokenId);
    // Add the sold NFT to the seller's sold NFTs
    _userSoldNFTs[previousOwner].push(tokenId);
}


//USERS SOLD NFTS------------------------------------------------------------------------------------------
    function fetchSoldNFTs() external view returns (uint256[] memory) {
        uint256[] memory soldNFTs = new uint256[](_currentTokenId);

        uint256 index = 0;
        for (uint256 i = 1; i <= _currentTokenId; i++) {
            if (_nfts[i].isSold && _nfts[i].owner == msg.sender) {
                soldNFTs[index] = i;
                index++;
            }
        }

// Resize the array to remove empty elements-----------------
        assembly {
            mstore(soldNFTs, index)
        }

        return soldNFTs;
    }

    function fetchUnsoldNFTs() external view returns (uint256[] memory) {
        uint256[] memory unsoldNFTs = new uint256[](_currentTokenId);

        uint256 index = 0;
        for (uint256 i = 1; i <= _currentTokenId; i++) {
            if (!_nfts[i].isSold && _nfts[i].owner == msg.sender) {
                unsoldNFTs[index] = i;
                index++;
            }
        }

// Resize the array to remove empty elements---------------------
        assembly {
            mstore(unsoldNFTs, index)
        }

        return unsoldNFTs;
    }

    
}
