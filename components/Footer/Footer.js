import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter, Profile } from "../Navbar/index";

const Footer = () => {
  const myprofile = [
    {
      name: "Edit Profile",
      link: "account",
    },
    {
      name: "My Items",
      link: "myitems",
    },
    {
      name: "Help",
      link: "contactus",
    },
  ];
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo" height={100} width={100} />
          <p>
            The world’s first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>
        <div className={Style.footer_box_help}>
          <h3>MY Profile</h3>

          {myprofile.map((el, i) => (
            <div className={Style.mp_box}>
              <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
