import { RouteComponentProps } from "react-router-dom";

export interface IRoute {
  path: string;
  caption: string;
  view:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export interface ITranslationRequest {
  text: string;
  date: Date;
  fromLang: string;
  toLang: string;
}
export interface ITranslationResponse {
  translation: string;
}
export interface ITranslationHistory {
  request: ITranslationRequest;
  response: ITranslationResponse;
}
