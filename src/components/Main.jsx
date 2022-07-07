import React, { useEffect, useState } from "react";
import {
  connect,
  fetchProfile,
  fetchSpace,
  writePost,
} from "../subsocial/subMethods";
import "../css/main.css";
//import { Client } from "twitter-api-sdk";

function Main() {
  //const client = new Client(process.env.BEARER_TOKEN);
  const [url, setUrl] = useState("");
  useEffect(() => {
    connect();
  }, []);
  const post = async () => {
    //let twit = parseUrl(url);

    //const tweet = await client.tweets.findTweetsById("1544636989647032321");
    //console.log(tweet.data.text);
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
        console.log(addresses[0]);
        let profile = await fetchProfile(addresses[0]);
        console.log(profile.id);
        let spaces = await fetchSpace(profile.id);
        console.log(spaces);
        //console.log(spaces[1].struct.id);
        writePost(spaces[0].struct.id, url);
      }
    });
  };

  function parseUrl(url) {
    console.log(url);
  }

  return (
    <div className='main'>
      <div className='input-group mb-3 justify-content-center'>
        <div className='input-group-prepend text-center'>
          <h1 className='h3 mb-3 font-weight-normal'>Paste twitter post url</h1>
          <div className='d-flex p-2'>
            <input
              placeholder='url'
              required
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button className='btn' onClick={() => post()}>
            Transfer post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
