import React from "react";
import { useContext, useState, useEffect } from "react";
//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, NFTCard } from "@/components/componentindex";
import { NFTMarketplaceconnection } from "@/connection/Contractconnection";
const Home = () => {
  const { getContract, checkIfWalletConnected } = useContext(
    NFTMarketplaceconnection
  );
  useEffect(() => {
    getContract();
  }, []);
  return (
    <div className={Style.homepage}>
      <HeroSection />

      <NFTCard />
    </div>
  );
};

export default Home;
