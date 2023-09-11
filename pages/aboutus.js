import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
//import { Brand } from "../components/componentsindex";
import images from "../img";

const aboutus = () => {
  const founderArray = [
    {
      name: "Avnish Gupta",
      position: "Co-founder & Director",
      images: images.NareshJain,
    },
    {
      name: "Naresh Jain",
      position: "Co-founder & COO",
      images: images.NareshJain,
    },
  ];

  const factsArray = [
    {
      title: "10 million",
      info: "Articles have been public around the world (as of Sept. 30, 2021)",
    },
    {
      title: "100,000",
      info: "Registered users account (as of Sept. 30, 2021)",
    },
    {
      title: "220+",
      info: "Countries and regions have our presence (as of Sept. 30, 2021",
    },
  ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <h1>👋 About Us.</h1>
          <p>
            Snapper Future Tech is a global services & technology products
            company, leading digital transformation and best blockchain
            development companies for enterprises using blockchain. It offers
            services in Blockchain application development, training &
            consulting and an innovative suite of specialized products for
            e-Governance, Financial Services, Insurance, Sustainable Supply
            Chain & Healthcare. Established in 2017 in Pune, Snapper Future Tech
            has raised Pre-Seed and Seed rounds through Enemtech Capital and
            strategic investors globally. A Hyperledger Certified Service
            Provider (HCSP) & Hyperledger Training partner (HTP), the company
            participates in open-source initiatives across the globe & has
            robust technological alliances & partnerships with Hyperledger,
            Oracle, Amazon Web Services, IBM, Trust over IP & Sovrin.
          </p>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>⛱ Founder</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img}>
                <Image
                  src={el.images}
                  alt={el.name}
                  width={500}
                  height={500}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h3>{el.name}</h3>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>🚀 Fast Facts</h2>
          <p>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content
          </p>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div className={Style.aboutus_box_facts_box_info}>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutus;
