import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  connect,
  fetchProfile,
  fetchSpace,
  writePost,
} from "../subsocial/subMethods";
import "../css/main.css";
import { getRequest } from "../twitter/getTweet";
//import { client } from "../twitter/twitter";

//import { Client } from "twitter-api-sdk";

function Main() {
  //const client = new Client(process.env.BEARER_TOKEN);
  const [url, setUrl] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [value, setValue] = useState();
  //console.log(value);
  //console.log(spaces);
  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    const { isWeb3Injected, web3Enable, web3AccountsSubscribe } = await import(
      "@polkadot/extension-dapp"
    );
    const injectedExtensions = await web3Enable(" twitter - dapp - subsocial ");
    if (!isWeb3Injected) {
      alert(" Browser do not have any polkadot extension ");
      return;
    }
    if (!injectedExtensions.length) {
      alert(" Polkadot Extension have not authorized us to get accounts ");
      return;
    }

    await web3AccountsSubscribe(async (accounts) => {
      if (accounts.length > 0) {
        const addresses = accounts.map((account) => account.address);
        //console.log(addresses[0]);
        let profile = await fetchProfile(addresses[0]);
        //console.log(profile.id);
        let spaces = await fetchSpace(profile.id);
        //console.log(spaces);
        setSpaces(spaces);
        //console.log(spaces[1].struct.id);
        //writePost(spaces[0].struct.id, url);
      }
    });
  };

  const post = async () => {
    writePost(value.struct.id, "setting select space");
  };

  const findTweet = async () => {
    //const tweet = await client.tweets.findTweetsById("1544636989647032321");
    //console.log(tweet.data.text);
    let tweet = await getRequest();
    console.log(tweet);
  };

  return (
    <div className='container'>
      <div className='container main'>
        <button className='btn' onClick={() => findTweet()}>
          twitter
        </button>
      </div>
      <div className='container main'>
        <button className='btn' onClick={() => connect()}>
          Connect wallet
        </button>

        <button className='btn' onClick={() => post()}>
          Post
        </button>
        <div style={{ width: "100px", minWidth: "15vw" }}>
          <Select
            options={spaces}
            value={value}
            onChange={setValue}
            getOptionLabel={(option) => option.content.name}
            getOptionValue={(option) => option.struct.id}
            style={{ width: "max-content" }}></Select>
        </div>
      </div>
    </div>
  );
}

export default Main;
