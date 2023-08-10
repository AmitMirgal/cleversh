import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { OPTIONS_MODE } from "./constants";

export const verifyMintPayload = (option: string, payload: any): boolean => {
  const { title, description, file } = payload;

  if (option === OPTIONS_MODE.AI) {
    if (isEmpty(description) || isEmpty(title) || isEmpty(file)) {
      return false;
    }
  } else {
    if (isEmpty(description) || isEmpty(file)) {
      return false;
    }
  }

  return true;
};

export const verifySignedPayload = (payload: string): boolean => {
  const parsedData = JSON.parse(payload);
  return get(parsedData, "signed", null);
};
