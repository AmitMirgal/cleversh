import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ModalProps } from "../types/modal";

import "../styles/modal.css";

export default function Modal(props: ModalProps) {
  const { isOpen, setIsOpen, qrCode } = props;

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="nftvyapar-modal-container"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="nftvyapar-modal-container__child-1" />
          </Transition.Child>

          <div className="nftvyapar-modal-container__child-2">
            <div className="nftvyapar-modal-container__child-3">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="nftvyapar-modal-container__panel">
                  <div className="nftvyapar-modal-container__panel-img-container">
                    <img
                      className="nftvyapar-modal-container__panel-img-container-block"
                      src={qrCode}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
