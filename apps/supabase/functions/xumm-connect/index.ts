// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { XummSdk } from "https://raw.githubusercontent.com/XRPL-Labs/XUMM-SDK/deno_v1.3.0/mod.ts";

console.log("xumm-connect server-sent events!");

const XUMM_APIKEY = Deno.env.get("XUMM_APIKEY");
const XUMM_APISECRET = Deno.env.get("XUMM_APISECRET");
const Sdk = new XummSdk(XUMM_APIKEY, XUMM_APISECRET);

serve(async (_) => {
  //const { name } = await req.json();
  const body = new ReadableStream({
    async start(controller) {
      const request: any = {
        TransactionType: "SignIn",
      };

      const payload: any = await Sdk.payload.create(request, true);

      const parsedPayload = {
        uuid: payload.uuid,
        qr_png: payload.refs.qr_png,
      };

      const createdPayloadMsg = new TextEncoder().encode(
        `data: ${JSON.stringify(parsedPayload)}\r\n\r\n`
      );

      controller.enqueue(createdPayloadMsg);

      const subscription = await Sdk.payload.subscribe(
        parsedPayload.uuid,
        async (event) => {
          if (typeof event.data.signed !== "undefined") {
            /**
             * Handle payload resolving, eg:
             *   1. Fetch updated payload results, with `Sdk.payload.get()`
             *   2. Fetch the transaction by hash (retrieved with 1.) on the XRPL to verify the transaction
             *   3. Persist the results in your own app's database
             *   4. Inform (async) the user (notification, mail, ...) if required
             */

            const payload = await Sdk.payload.get(parsedPayload.uuid);
            const payloadMsg = new TextEncoder().encode(
              `data: ${JSON.stringify(payload)}\r\n\r\n`
            );
            controller.enqueue(payloadMsg);
          }
        }
      );
    },
    cancel(reason) {
      console.log("inside the cancel call ==>>> ", reason);
    },
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
