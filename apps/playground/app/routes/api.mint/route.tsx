import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { mint } from "nft-vyapar";

export async function loader(_: LoaderArgs) {
  return json("calling mint api...");
}

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const option = body.get("option");
  let description: any = body.get("description");
  let file: any = body.get("file");

  if (option === "AI") {
    // do something
  }

  const payload = await mint({
    file,
    address: process.env.TEST_WALLET,
    description,
    secrets: {
      NFT_STORAGE_TOKEN: process.env.NFT_STORAGE_TOKEN,
      XUMM_APIKEY: process.env.XUMM_APIKEY,
      XUMM_APISECRET: process.env.XUMM_APISECRET,
    },
  });

  return json(payload);
};
