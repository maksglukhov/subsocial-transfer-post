import React, { useEffect } from "react";
import {
  connect,
  fetchProfile,
  fetchSpace,
  writePost,
} from "../subsocial/subMethods";
import "../css/connectWallet.css";
function Navbar() {
  const styleClassNameLi = "nav-item p-2";

  const connectWallet = async () => {
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
        //writePost(spaces[0].struct.id);
      }
    });
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className='connectWallet'>
      <button
        className='btn'
        size='large'
        type='primary'
        onClick={() => connectWallet()}
        style={{ background: "transparent", border: "0px" }}>
        Connect wallet
      </button>
    </div>
  );
}

export default Navbar;
