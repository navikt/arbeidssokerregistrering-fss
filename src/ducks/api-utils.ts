import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { AppState } from "../reducer";
import ActionType from "./actions";
import { hentBrukerFnr, hentVeilederEnhetId } from "../utils/fss-utils";

export const STATUS = {
  NOT_STARTED: "NOT_STARTED",
  PENDING: "PENDING",
  OK: "OK",
  RELOADING: "RELOADING",
  ERROR: "ERROR",
};

class FetchError extends Error {
  public response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

type RecoverWith = (status: number) => unknown | null;

export function leggTilFnrForPersonbruker(url: string) {
  return url + "?fnr=" + hentBrukerFnr();
}

export function leggTilFnrOgEnhet(url: string) {
  return url + "?fnr=" + hentBrukerFnr() + "&enhetId=" + hentVeilederEnhetId();
}

export function sjekkStatuskode(recoverWith?: RecoverWith) {
  return (response: Response) => {
    if (response.status >= 200 && response.status < 300 && response.ok) {
      return Promise.resolve(response);
    }

    return !!recoverWith && !!recoverWith(response.status)
      ? Promise.resolve({ json: () => recoverWith(response.status) })
      : Promise.reject(new FetchError(response.statusText, response));
  };
}

export function toJson(response: Response) {
  if (response.status !== 204) {
    // No content
    return response.json();
  }
  return response;
}

export function sendResultatTilDispatch(dispatch: ThunkDispatch<AppState, void, AnyAction>, action: ActionType) {
  return <S>(data: S): S => {
    // if (data.length === 1) {
    //     return dispatch({ type: action, data: data[0] });
    // }
    dispatch({ type: action, data });
    return data;
  };
}

export function handterFeil(dispatch: ThunkDispatch<AppState, void, AnyAction>, action: ActionType) {
  return (error: FetchError): void => {
    if (error.response) {
      error.response
        .text()
        .then((data: string) => {
          if (isJsonString(data)) {
            dispatch({ type: action, data: { response: error.response, data: JSON.parse(data) } });
          } else {
            dispatch({ type: action, data: { response: error.response, data } });
          }
        })
        .catch();
    } else {
      console.error(error, error.stack);
      dispatch({ type: action, data: error.toString() });
    }
  };
}

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

interface FetchToJson {
  url: string;
  config?: RequestInit;
  recoverWith?: RecoverWith;
}

export function fetchToJson<DATA>({ url, config = {}, recoverWith }: FetchToJson): Promise<DATA> {
  return fetch(url, config).then(sjekkStatuskode(recoverWith)).then(toJson);
}

interface RestActions {
  OK: ActionType;
  PENDING: ActionType;
  FEILET: ActionType;
}

export function doThenDispatch<DATA>(
  fn: () => Promise<DATA>,
  { OK, FEILET, PENDING }: RestActions
): ThunkAction<Promise<DATA | void>, AppState, unknown, AnyAction> {
  return (dispatch: ThunkDispatch<AppState, void, AnyAction>) => {
    if (PENDING) {
      dispatch({ type: PENDING });
    }
    return fn().then(sendResultatTilDispatch(dispatch, OK)).catch(handterFeil(dispatch, FEILET));
  };
}

export function fetchWithTimeout(input: RequestInfo, timeoutMillis: number, init?: RequestInit): Promise<Response> {
  return new Promise((resolve, reject) => {
    fetch(input, init).then(resolve).catch(reject);

    if (timeoutMillis) {
      const error = new Error("Connection timed out");
      setTimeout(reject, timeoutMillis, error);
    }
  });
}
