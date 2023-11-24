import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//WALLET-CONNECT
import { useWeb3Modal } from "@web3modal/react";

import { useAccount, isConnected, useDisconnect } from "wagmi";
//----IMPORT ICON
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

//INTERNAL IMPORT
import Style from "./Navbar.module.css";
import { HelpCenter, Profile, SideBar } from "./index";
import { Button } from "../componentindex";
import images from "../../img";
import aboutus from "@/pages/aboutus";

const Navbar = ({ ethereumClient }) => {
  //----USESTATE COMPONNTS

  const [help, setHelp] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Help Center") {
      setHelp(true);

      setProfile(false);
    } else {
      setHelp(false);

      setProfile(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };
  // CLOSING
  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the click is outside of the sections and close them
      if (!event.target.closest(`.${Style.help}`)) {
        setHelp(false);
      }
      if (
        !event.target.closest(`.${Style.navbar_container_right_profile_box}`)
      ) {
        setProfile(false);
      }
    };

    if (help || profile) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [help, profile]);

  //WALLET-CONNECT
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [selectedAccount, setSelectedAccount] = useState(null);
  useEffect(() => {
    if (ethereumClient) {
      ethereumClient.provider.on("accountsChanged", function (accounts) {
        console.log(accounts);
        setSelectedAccount(accounts[0]);
      });
    }
  }, [ethereumClient]);
  const handleClick = () => {
    if (!selectedAccount) {
      open();
    } else {
      console.log("ERROR WHILE CONNECTING WITH WALLET ");
    }
  };
  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Link href="/">
              <Image
                src={images.logo}
                alt="NFT MARKET PLACE"
                width={60}
                height={60}
              />
            </Link>
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}

        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            <Link href="/">
              <p>Home</p>
            </Link>
          </div>

          <div className={Style.navbar_container_right_discover}>
            <Link href="/searchPage">
              <p>Search</p>
            </Link>
          </div>

          {/* HELP CENTER MENU */}

          <div className={Style.navbar_container_right_help}>
            <div
              className={help ? `${Style.help} ${Style.active}` : Style.help}
            >
              <p onClick={(e) => openMenu(e)}>Help Center</p>
              {help && (
                <div className={Style.navbar_container_right_help_box}>
                  <HelpCenter />
                </div>
              )}
            </div>
          </div>

          {/* CONNECT BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            <Button
              btnName={selectedAccount ? selectedAccount : "Connect"}
              handleClick={handleClick}
            />
          </div>
          <div className={Style.navbar_container_right_button}>
            <Link href="/uploadNFT">
              <Button btnName="Create" handleClick={() => {}} />
            </Link>
          </div>

          {/* USER PROFILE */}

          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile />}
            </div>
          </div>

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR COMPONENT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setOpenSideMenu={setOpenSideMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
