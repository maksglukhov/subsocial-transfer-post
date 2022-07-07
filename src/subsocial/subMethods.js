import { newFlatSubsocialApi } from "@subsocial/api";
import config from "./config";
import {
  IpfsContent,
  OptionBool,
  SpaceUpdate,
} from "@subsocial/types/substrate/classes";

let flatApi;

export const signAndSendTx = async (tx) => {
  const { isWeb3Injected, web3Enable, web3AccountsSubscribe, web3FromAddress } =
    await import("@polkadot/extension-dapp");
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
      const { signer } = await web3FromAddress(addresses[0]);
      await tx.signAsync(addresses[0], { signer });
      await tx.send((result) => {
        const { status } = result;

        if (!result || !status) {
          return;
        }
        if (status.isFinalized || status.isInBlock) {
          const blockHash = status.isFinalized
            ? status.asFinalized
            : status.asInBlock;
          console.log("✅ Tx finalized. Block hash", blockHash.toString());
        } else if (result.isError) {
          console.log(JSON.stringify(result));
        } else {
          console.log("⏱ Current tx status:", status.type);
        }
      });
    }
  });
};

export const connect = async () =>
  (flatApi = await newFlatSubsocialApi({
    ...config,
    useServer: {
      httpRequestMethod: "get",
    },
  }));

export const fetchProfile = async (address) => {
  const accountId = address;
  const profile = await flatApi.findProfile(accountId);
  return profile;
};

export const fetchSpace = async (userAddress) => {
  const spaceIds = await flatApi.subsocial.substrate.spaceIdsByOwner(
    userAddress
  );
  const spaces = await flatApi.subsocial.findSpaces({ ids: spaceIds });
  return spaces;
};

export const writePost = async (spaceId, message) => {
  const cid = await flatApi.subsocial.ipfs.saveContent({
    title: "Test post",
    tags: ["test", "dapp", "react"],
    body: message,
  });
  const substrateApi = await flatApi.subsocial.substrate.api;
  const postTransaction = substrateApi.tx.posts.createPost(
    spaceId,
    { RegularPost: null }, // Creates a regular post.
    IpfsContent(cid)
  );

  signAndSendTx(postTransaction);
};
