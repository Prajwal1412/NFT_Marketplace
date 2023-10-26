import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";

const NFTCard = () => {
  const featureArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div class={Style.nft_card}>
      <Image src={images.nft_image_2} alt="NFT Image" class="nft-image" />
      <div class={Style.nft_details}>
        <span class={Style.nft_price}>Price: 0.1 ETH</span>
        <span class={Style.nft_description}>
          This is an example description of the NFT.
        </span>
        <button class={Style.buy_button}>Buy</button>
      </div>
    </div>
  );
};

export default NFTCard;
