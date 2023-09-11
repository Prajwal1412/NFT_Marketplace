import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./upload.module.css";
import images from "../img";
import { Button } from "@/components/componentindex";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";

const UloadNFT = () => {
  const [active, setActive] = useState(0);
  const [itemName, setItemName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [properties, setProperties] = useState("");

  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        itemName={itemName}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        properties={properties}
        image={images.upload}
      />

      <div className={Style.upload_box}>
        <div className={Style.Form_box_input}>
          <label htmlFor="nft">Item Name</label>
          <input
            type="text"
            placeholder="Dancing Ape"
            className={Style.Form_box_input_userName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className={Style.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={Style.Form_box_input_box}>
            <div className={Style.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>

            <input
              type="text"
              placeholder="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <p className={Style.upload_box_input_para}>
            Ciscrypt will include a link to this URL on this item's detail page,
            so that users can click to learn more about it. You are welcome to
            link to your own webpage with more details.
          </p>
        </div>

        <div className={Style.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>

        <div className={Style.Form_box_input_social}>
          <div className={Style.Form_box_input}>
            <label htmlFor="Royalties">Royalties</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="20%"
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="size">Size</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder="165MB"
                onChange={(e) => setFileSize(e.target.value)}
              />
            </div>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="Propertie">Propertie</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Propertie"
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={() => {}}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UloadNFT;
