import React from "react";
import { useEffect, useState, useContext } from "react";
//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { SearchBar } from "../SearchPage/searchBarIndex";

import { NFTCardTwo } from "../collectionPage/collectionIndex";
import images from "../img";

import { NFTMarketplaceconnection } from "../connection/Contractconnection";
const searchPage = () => {
  const { fetchCreatedNFTs } = useContext(NFTMarketplaceconnection);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  useEffect(() => {
    fetchCreatedNFTs().then((item) => {
      const reversedNfts = item.slice().reverse(); // Create a new array with reversed data
      setNfts(reversedNfts); // Update state with the new array
      console.log(reversedNfts); // Log the reversed array
    });
  }, []);

  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.searchPage}>
      <SearchBar />

      <NFTCardTwo NFTData={nfts} />
    </div>
  );
};

export default searchPage;
