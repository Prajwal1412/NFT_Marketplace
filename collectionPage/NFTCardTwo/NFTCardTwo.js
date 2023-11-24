import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { ethers } from "ethers";
//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";

const NFTCardTwo = ({ NFTData }) => {
  useEffect(() => {
    console.log(NFTData); // Check the NFTData array in the console
  }, [NFTData]);

  return (
    <div className={Style.NFTCardTwo}>
      {NFTData.map((el, i) => (
        <div className={Style.NFTCardTwo_box} key={i + 1}>
          <div className={Style.NFTCardTwo_box_like}>
            <div className={Style.NFTCardTwo_box_like_box}>
              <div className={Style.NFTCardTwo_box_like_box_box}>
                <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
              </div>
            </div>
          </div>
          <div className={Style.NFTCardTwo_box_img}>
            <Image
              src={el.image}
              alt="NFT Image Loading...."
              width={400}
              height={400}
              objectFit="cover"
              className={Style.NFTCardTwo_box_img_img}
            />
          </div>

          <div className={Style.NFTCardTwo_box_info}>
            <div className={Style.NFTCardTwo_box_info_left}>
              <p>{el.name}</p>
            </div>
          </div>

          <div className={Style.NFTCardTwo_box_price}>
            <div className={Style.NFTCardTwo_box_price_box}>
              <small>Price</small>
              <p>{ethers.utils.formatUnits(el.price)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTCardTwo;
