import { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { verifySignedPayload } from "./utils/helper";
import { SellNFTProps } from "./types/sellNFT";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/modal";

const defaultPayload = {
  uuid: "",
  refs: {
    qr_png: "",
    websocket_status: "",
  },
};

export function SellNFT(props: SellNFTProps) {
  const {
    callbackUrl,
    callbackFn,
    address,
    destinationAddress,
    tokenId,
    description,
    amount,
  } = props;
  const [payload, setPayload] = useState(defaultPayload);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const formData = new FormData();

      formData.append("address", address);
      formData.append("destinationAddress", destinationAddress);
      formData.append("tokenId", tokenId);
      formData.append("description", description);
      formData.append("amount", amount);

      const payload: any = await fetch(callbackUrl, {
        method: "POST",
        body: formData,
      });

      const response = await payload.json();

      setPayload(response);
      setIsOpen(true);
    })();
  }, []);

  useEffect(() => {
    if (!isEmpty(payload?.refs?.websocket_status)) {
      const socket = new WebSocket(payload.refs.websocket_status);

      socket.addEventListener("open", (_) => {
        console.log("WebSocket connection established");
      });

      socket.addEventListener("message", (event) => {
        const isSigned = verifySignedPayload(event.data);
        if (isSigned !== null) {
          if (isSigned) {
            toast.success("sell offer created successfully!");
            callbackFn("success");
          } else {
            toast.error("something went wrong...");
          }
          setIsOpen(false);
          socket.close();
        }
      });

      socket.addEventListener("error", (_) => {
        setIsOpen(false);
      });

      socket.addEventListener("close", (_) => {
        setIsOpen(false);
      });
    }
  }, [payload]);

  return (
    <>
      <Toaster />
      {!isEmpty(payload.refs.qr_png) && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          qrCode={payload.refs.qr_png}
        />
      )}
    </>
  );
}
