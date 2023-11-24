import React, { useEffect, useState, useContext } from "react";
import Style from "../styles/searchPage.module.css";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { NFTCardTwo } from "../collectionPage/collectionIndex";
import images from "../img";
import { NFTMarketplaceconnection } from "../connection/Contractconnection";

const SearchPage = () => {
  const { fetchListedNFTs } = useContext(NFTMarketplaceconnection);
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    fetchListedNFTs().then((item) => {
      setNftData(item);
      console.log(nftData);
    });
  }, []);

  return (
    <div className={Style.searchPage}>
      <SearchBar />
      <NFTCardTwo NFTData={nftData} />
    </div>
  );
};

export default SearchPage;
