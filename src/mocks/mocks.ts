import FetchMock, { Middleware, MiddlewareUtils } from "yet-another-fetch-mock";

import { BRUKER_KONTEKST_URL, FEATURE_URL, OPPDATER_KONTEKST_URL, VEILARBREGISTRERING_URL } from "../ducks/api";
import { getStore } from "../store";
import { ActionTypes as SvarActionTypes, SporsmalId } from "../ducks/svar";
import svarMock from "./svar-mock";
import { ActionTypes as SisteStillingActionTypes } from "../ducks/siste-stilling";
import { sisteStillingMock } from "./siste-stilling-mock";
import { hentSvar } from "../ducks/svar-utils";
import pamJanzzData from "./typeahead-mock";
import startRegistreringStatus from "./registreringstatus-mock";
import sisteStillingFraAAReg from "./siste-stilling-fra-aareg-mock";
import brukerKontekst from "./fss-bruker-kontekst";
import {
  // eslint-disable-next-line
  ordinaerRegistreringRespons,
  sykmeldtRegistreringRespons,
  // eslint-disable-next-line
  manglerArbeidstillatelseFeilResponse,
} from "./registrerbruker-mock";
import { featureTogglesMock } from "./feature-toggles-mock";
import oversettelseAvStillingFraAAReg from "./oversettelse-av-stilling-fra-aareg-mock";
import opprettKontaktmegOppgaveRespons from "./oppgave-mock";
// eslint-disable-next-line
import { kontaktinfoRespons, kontaktinfoFeilrespons } from "./kontaktinfo-mock";

export const MOCK_START_REGISRERING_STATUS = true;
export const MOCK_BRUKERS_NAVN = true;
export const MOCK_GET_SISTE_ARBIEDSFORHOLD = true;
export const MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ = true;
export const MOCK_STYRK08_PAMJANZZ = true;
export const MOCK_FEATURE_TOGGLES = true;
export const MOCK_REGISTRER_BRUKER = true;
export const MOCK_REAKTIVER_BRUKER = true;
export const MOCK_BRUKER_KONTEKST = true;
export const MOCK_OPPRETT_KONTAKTMEG_OPPGAVE = true;
export const MOCK_KONTAKTINFO = true;

export const MOCK_OPPDATER_BRUKER_KONTEKST = true;
export const DISPATCH_BESVARELSE = process.env.REACT_APP_MOCK_BES || false;

function lagPamjanzzRespons({ q }: { q: string }) {
  const { typeaheadYrkeList } = pamJanzzData;
  console.log("q", q);
  const filtrertListe = typeaheadYrkeList.filter((data) => data.label.toLowerCase().includes(q.toLowerCase()));
  return {
    typeaheadYrkeList: filtrertListe,
  };
}

const loggingMiddleware: Middleware = (request, response) => {
  console.groupCollapsed(request.url);
  console.groupCollapsed("config");
  console.log("url", request.url);
  console.log("queryParams", request.queryParams);
  console.log("pathParams", request.pathParams);
  console.log("body", request.body);
  console.groupEnd();

  try {
    console.log("response", JSON.parse(response.body));
  } catch (e) {
    console.log("response", response);
  }

  console.groupEnd();
  return response;
};

const mock = FetchMock.configure({
  enableFallback: true,
  middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(0), loggingMiddleware),
});

// Dette dispatcher svarene _før_ noe annet skjer,
// som kan føre til en sær tilstand. Siste test før merge bør skje uten dette flagget.
const DELAY = 0;

const GET = (url, data, delay = 0) => {
  return mock.get(url, (req, res, ctx) => res(ctx.delay(delay), ctx.json(data)));
};

const POST = (url, data, delay = 0) => {
  return mock.post(url, (req, res, ctx) => res(ctx.delay(delay), ctx.json(data)));
};

const DELETE = (url, data, delay = 0) => {
  return mock.delete(url, (req, res, ctx) => res(ctx.delay(delay), ctx.json(data)));
};

if (MOCK_START_REGISRERING_STATUS) {
  GET(`${VEILARBREGISTRERING_URL}/startregistrering`, startRegistreringStatus);
}

if (MOCK_FEATURE_TOGGLES) {
  GET(`${FEATURE_URL}`, featureTogglesMock);
}

if (MOCK_GET_SISTE_ARBIEDSFORHOLD) {
  GET(`${VEILARBREGISTRERING_URL}/sistearbeidsforhold`, sisteStillingFraAAReg);
}

if (MOCK_GET_KODEOVERSETTING_FRA_PAMJANZZ) {
  GET("/pam-janzz/rest/kryssklassifiserMedKonsept", oversettelseAvStillingFraAAReg);
}

if (MOCK_STYRK08_PAMJANZZ) {
  GET("/pam-janzz/rest/typeahead/yrke-med-styrk08", pamJanzzData);
}

if (MOCK_REGISTRER_BRUKER) {
  POST(`${VEILARBREGISTRERING_URL}/fullfoerordinaerregistrering`, ordinaerRegistreringRespons);
  /*
        mock.post(`${VEILARBREGISTRERING_URL}/fullfoerordinaerregistrering`,
                   ResponseUtils.combine(ResponseUtils.statusCode(500),
                   manglerArbeidstillatelseFeilResponse));
    */
  POST(`${VEILARBREGISTRERING_URL}/fullfoersykmeldtregistrering`, sykmeldtRegistreringRespons);
}

if (MOCK_REAKTIVER_BRUKER) {
  POST(`${VEILARBREGISTRERING_URL}/fullfoerreaktivering`, {});
}

if (MOCK_OPPRETT_KONTAKTMEG_OPPGAVE) {
  POST(`${VEILARBREGISTRERING_URL}/oppgave`, opprettKontaktmegOppgaveRespons, 100);
  // mock.post(`${VEILARBREGISTRERING_URL}/oppgave`, ResponseUtils.statusCode(500));
  // mock.post(`${VEILARBREGISTRERING_URL}/oppgave`, ResponseUtils.statusCode(403));
}

if (MOCK_BRUKER_KONTEKST) {
  GET(`${BRUKER_KONTEKST_URL}`, brukerKontekst);
  DELETE(`${BRUKER_KONTEKST_URL}`, {});
}

if (MOCK_OPPDATER_BRUKER_KONTEKST) {
  POST(`${OPPDATER_KONTEKST_URL}`, {});
}

if (MOCK_KONTAKTINFO) {
  GET(`${VEILARBREGISTRERING_URL}/person/kontaktinfo`, kontaktinfoRespons);
  //mock.get(`${VEILARBREGISTRERING_URL}/person/kontaktinfo`, ResponseUtils.delayed(DELAY, ResponseUtils.statusCode(404)));
  /*
        mock.get(`${VEILARBREGISTRERING_URL}/person/kontaktinfo`,
                 ResponseUtils.combine(ResponseUtils.statusCode(500),
                 kontaktinfoFeilrespons));
    */
}

if (DISPATCH_BESVARELSE) {
  const store = getStore();
  [
    SporsmalId.dinSituasjon,
    SporsmalId.sisteStilling,
    SporsmalId.utdanning,
    SporsmalId.utdanningGodkjent,
    SporsmalId.utdanningBestatt,
    SporsmalId.helseHinder,
    SporsmalId.andreForhold,
  ].forEach((sporsmalId) =>
    store.dispatch({
      type: SvarActionTypes.AVGI_SVAR,
      data: {
        sporsmalId,
        svar: hentSvar(svarMock, sporsmalId),
      },
    })
  );
  store.dispatch({
    type: SisteStillingActionTypes.ENDRE_SISTE_STILLING,
    data: {
      stilling: sisteStillingMock,
    },
  });
}

export default mock;
