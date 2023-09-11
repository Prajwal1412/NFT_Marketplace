import React from "react";
//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, NFTCard } from "@/components/componentindex";
const Home = () => {
  return (
    <div className={Style.homepage}>
      <HeroSection />
      <NFTCard />
    </div>
  );
};

export default Home;
