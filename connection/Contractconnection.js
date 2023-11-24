import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as IPFSHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";

//INTERNAL IMPORTS
import { ContractAddress, Abi } from "./constants";

export const NFTMarketplaceconnection = React.createContext();
export const NFTMarketplaceprovider = ({ children }) => {
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, Abi, signerOrProvider);
  const router = useRouter();
  //INFURA -----------------------------------------------------------------------------------------

  const projectId = "2WNCbRcCGx4LWEhPSl4DJgRjXyl";
  const projectSecret = "b5c9ed70b66996a25b4490be960747d7";
  const subdomain = "https://nftmp-mp.infura-ipfs.io";

  const ipfs = IPFSHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: `Basic ${Buffer.from(
        `${projectId}:${projectSecret}`
      ).toString("base64")}`,
    },
  });

  // UPLOADING TO IPFS INFURA
  const uploadToIPFS = async (file) => {
    try {
      const added = await ipfs.add({ content: file });
      const imageCID = added.cid.toString();
      const url = `${subdomain}/ipfs/${imageCID}`;
      return url;
    } catch (error) {
      console.log("ERROR WHILE UPLOADING TO IPFS", error);
    }
  };

  // CONNECTION WITH SMART CONTRACT
  const getContract = async () => {
    const web3Modal = new Web3Modal();
    const provider = await web3Modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const contract = fetchContract(signer);
    console.log("CONNECTING WITH SMART CONTRACT DONE!!!");
    console.log(contract);
    return contract;
  };

  // CREATE NFT
  const createNFT = async (name, price, amount, image, description, router) => {
    if (!name || !description || !price || !image || !amount)
      return console.log("DATA IS MISSING");
    const data = JSON.stringify({
      name,
      description,
      price,
      amount,
      image,
    });
    console.log("DATA:", data);

    const added = await ipfs.add(data);
    const url = `https://infura-ipfs.io/ipfs/${added.cid.toString()}`;
    console.log("METADATA URL:", url);
    await createsale(amount, price);
  };

  const createsale = async (amount, formprice) => {
    const price = ethers.utils.parseUnits(formprice);
    const contract = await getContract();
    const transaction = await contract.createNFT(amount, price);
    await transaction.wait();
    router.push("/searchPage");
    console.log("Transaction DATA:", transaction);
    console.log("NFT CREATED SUCCESSFULLY !!!!!!!!!!!!!!");
  };

  // Fetch purchased NFTs
  const fetchPurchasedNFTs = async () => {
    try {
      const contract = await getContract();
      const purchasedNFTs = await contract.fetchPurchasedNFTs();
      return purchasedNFTs;
    } catch (error) {
      console.log("ERROR WHILE FETCHING PURCHASED NFTs");
    }
  };

  // Fetch all created NFTs

  const fetchListedNFTs = async () => {
    try {
      const contract = await getContract();
      const listedNFTs = await contract.fetchListedNFTs();

      listedNFTs.forEach((nftInfo) => {
        console.log("Name:", nftInfo.name);
        console.log("Token ID:", nftInfo.tokenId.toString());
        console.log("Owner:", nftInfo.owner);
        console.log("Price:", ethers.utils.formatUnits(nftInfo.price));
        console.log("Is Sold:", nftInfo.isSold);
        console.log("Remaining Amount:", nftInfo.remainingAmount);
        console.log(" Image :", nftInfo.url);
      });

      return listedNFTs;
    } catch (error) {
      console.log("ERROR WHILE FETCH LISTED NFTs", error);
    }
  };

  useEffect(() => {
    fetchListedNFTs().then((listedNFTs) => {
      console.log("Listed NFT's", listedNFTs);
    });
  }, []);

  // Fetch created NFTs by user
  const fetchCreatedNFTs = async () => {
    try {
      const contract = await getContract();
      const createdNFTs = await contract.fetchCreatedNFTs();
      return createdNFTs;
    } catch (error) {
      console.log("ERROR WHILE FETCHING CREATED NFTs");
    }
  };

  // Fetch sold NFTs
  const fetchSoldNFTs = async () => {
    try {
      const contract = await getContract();
      const soldNFTs = await contract.fetchSoldNFTs();
      return soldNFTs;
    } catch (error) {
      console.log("ERROR WHILE FETCHING SOLD NFTs");
    }
  };

  // Fetch unsold NFTs
  const fetchUnsoldNFTs = async () => {
    try {
      const contract = await getContract();
      const unsoldNFTs = await contract.fetchUnsoldNFTs();
      return unsoldNFTs;
    } catch (error) {
      console.log("ERROR WHILE FETCHING UNSOLD NFTs");
    }
  };

  return (
    <NFTMarketplaceconnection.Provider
      value={{
        getContract,
        createNFT,
        uploadToIPFS,
        fetchListedNFTs,
      }}
    >
      {children}
    </NFTMarketplaceconnection.Provider>
  );
};
