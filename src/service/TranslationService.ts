import axios from "axios";
import { ITranslationRequest, ITranslationResponse } from "../models";

interface IGoogleTranslationResponse {
  data: {
    translations: [
      {
        translatedText: string;
      }
    ];
  };
}

const getURL = (options: ITranslationRequest): string => {
  const parts: { [key: string]: string | undefined } = {
    key: process.env.REACT_APP_GOOGLE_TRANSLATE_API_SECRET,
    q: encodeURI(options.text),
    source: options.fromLang,
    target: options.toLang,
  };
  const query = Object.keys(parts)
    .map((key) => `${key}=${parts[key] || ""}`)
    .join("&");
  return `${process.env.REACT_APP_GOOGLE_TRANSLATE_API_URL}?${query}`;
};

const decodeTranslation = (text: string): string => {
  const d = document.createElement("div");
  d.innerHTML = text;
  return d.innerText;
};
const convertTranslation = (
  response: IGoogleTranslationResponse
): ITranslationResponse => {
  const arr = response?.data?.translations;
  const converted = { translation: "" } as ITranslationResponse;
  if (Array.isArray(arr) && arr[0]?.translatedText) {
    converted.translation = decodeTranslation(arr[0].translatedText);
  }
  return converted;
};

const Translate = (
  request: ITranslationRequest
): Promise<ITranslationResponse> => {
  return new Promise<ITranslationResponse>((resolve, reject) => {
    const url = getURL(request);
    axios
      .get<IGoogleTranslationResponse>(url)
      .then((response) => {
        resolve(convertTranslation(response.data));
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

export const TranslationService = { Translate };
