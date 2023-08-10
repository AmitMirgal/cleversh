import { useCallback, useState, useMemo, useEffect, useRef } from "react";
import { PaperClipIcon, BoltIcon } from "@heroicons/react/20/solid";
import { BoltIcon as OutlineBoltIcon } from "@heroicons/react/24/outline";
import isEmpty from "lodash/isEmpty";
import { TextareaProps } from "./types/textarea";
import { OPTIONS_MODE } from "./utils/constants";
import { verifyMintPayload, verifySignedPayload } from "./utils/helper";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/modal";

import "./styles/textarea.css";

const defaultFileDetails = {
  name: "",
  base64String: "",
};

const defaultPayload = {
  uuid: "",
  refs: {
    qr_png: "",
    websocket_status: "",
  },
  imageUrl: "",
  title: "",
  description: "",
};

export function Textarea(props: TextareaProps) {
  const { callbackUrl, callbackFn } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [isAIMode, setIsAIMode] = useState(false);
  const [fileDetails, setFileDetails] = useState(defaultFileDetails);
  const [payload, setPayload] = useState(defaultPayload);
  const [isOpen, setIsOpen] = useState(false);

  const reset = () => {
    if (descriptionRef.current) {
      descriptionRef.current.value = "";
    }

    if (titleRef.current) {
      titleRef.current.value = "";
    }

    setFileDetails(defaultFileDetails);
  };

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
            toast.success("nft created successfully!");
            callbackFn(payload);
          } else {
            toast.error("something went wrong...");
          }
          setLoading(false);
          setIsOpen(false);
          socket.close();
        }
      });

      socket.addEventListener("error", (_) => {
        setLoading(false);
      });

      socket.addEventListener("close", (_) => {
        setLoading(false);
      });
    }
  }, [payload]);

  const buttonClassName = useMemo(() => {
    const className =
      "nftvyapar-textarea-container__sub-controllers-block-create-button";
    const btnClassName = loading
      ? `nftvyapar-textarea-container__sub-controllers-block-create-button-with-loading ${className}`
      : className;

    return btnClassName;
  }, [loading]);

  const uploadFile = useCallback(
    (event: any) => {
      const reader = new FileReader();
      reader.onload = async function() {
        /* Base64 is a binary-to-text encoding scheme used to
          transport data. The encoding is necessary when the transfer
          medium is not able to handle binary data.
          This binary data is then translated to a text representation (base64) and transferred as text. */

        // base64 is an algorithm for encoding and decoding an object to ASCII format.
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const base64String: any = reader?.result;

        setFileDetails({
          name: event.target.files[0].name,
          base64String: base64String.split(",")[1],
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    [fileDetails]
  );

  const mintHandler = async () => {
    setLoading(true);

    const option = isAIMode ? OPTIONS_MODE.AI : OPTIONS_MODE.Mint;
    const description = descriptionRef?.current?.value ?? "";
    const title = titleRef?.current?.value ?? "";
    const file = fileDetails.base64String;
    const isVerified = verifyMintPayload(option, {
      title,
      description,
      file,
    });

    if (isVerified) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);
      formData.append("description", description);
      formData.append("option", option);

      const payload: any = await fetch(callbackUrl, {
        method: "POST",
        body: formData,
      });

      const response = await payload.json();

      const parsedResponse = {
        ...response,
        title,
      };
      setPayload(parsedResponse);
      setIsOpen(true);
      reset();
    } else {
      toast.error("Required fields are missing...");
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="nftvyapar-textarea-container">
        <div className="nftvyapar-textarea-container__inputs">
          <label
            htmlFor="title"
            className="nftvyapar-textarea-container__input--label"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="nftvyapar-textarea-container__input-title"
            placeholder="Title"
            ref={titleRef}
          />
          <label
            htmlFor="description"
            className="nftvyapar-textarea-container__input--label"
          >
            Description
          </label>
          <textarea
            rows={2}
            name="description"
            id="description"
            className="nftvyapar-textarea-container__input-description"
            placeholder="Write a description..."
            ref={descriptionRef}
          />

          <div
            aria-hidden="true"
            className="nftvyapar-textarea-container__elements"
          >
            <div className="nftvyapar-textarea-container__element-1">
              <div className="nftvyapar-textarea-container__inner-1" />
            </div>
            <div className="nftvyapar-textarea-container__element-2" />
            <div className="nftvyapar-textarea-container__element-1">
              <div className="nftvyapar-textarea-container__inner-2">
                <div className="nftvyapar-textarea-container__inner-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="nftvyapar-textarea-container__controllers">
          <div className="nftvyapar-textarea-container__option-mode">
            <button
              type="button"
              className="group nftvyapar-textarea-container__option-button"
              onClick={() => setIsAIMode(!isAIMode)}
            >
              {isAIMode ? (
                <BoltIcon
                  className={
                    "nftvyapar-textarea-container__option-button--bolt-icon"
                  }
                  aria-hidden="true"
                />
              ) : (
                <OutlineBoltIcon className="nftvyapar-textarea-container__option-button--outline-bolt-icon" />
              )}
              {OPTIONS_MODE.AI}
            </button>
          </div>
          <div className="nftvyapar-textarea-container__sub-controllers">
            <div className="nftvyapar-textarea-container__sub-controllers-block">
              <button
                type="button"
                className="group nftvyapar-textarea-container__sub-controllers-block--paperclip-button"
              >
                <PaperClipIcon
                  className="nftvyapar-textarea-container__sub-controllers-block--paperclip-button--icon group-hover:text-gray-500"
                  aria-hidden="true"
                />

                <label
                  htmlFor="input-attach-file"
                  className="nftvyapar-textarea-container__sub-controllers-block-input-attach"
                  onChange={(event) => uploadFile(event)}
                >
                  {isEmpty(fileDetails.name)
                    ? "Attach a file"
                    : fileDetails.name}
                  <input
                    id="input-attach-file"
                    className="nftvyapar-textarea-container__sub-controllers-block-input-attach-hide-input"
                    type="file"
                  />
                </label>
              </button>
            </div>
            <div className="nftvyapar-textarea-container__sub-controllers-block-mint">
              <button
                onClick={() => mintHandler()}
                className={buttonClassName}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="nftvyapar-textarea-container__sub-controllers-block-mint--animate-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="nftvyapar-textarea-container__sub-controllers-block-mint--animate-circle-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="nftvyapar-textarea-container__sub-controllers-block-mint--animate-circle-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

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
