import { fetchToJson, leggTilFnrForPersonbruker, leggTilFnrOgEnhet } from "./api-utils";
import { Data as RegistrerBrukerData } from "./registrerbruker";
import { alleFeatureToggles } from "./feature-toggles";
import { RegistreringType } from "./registreringstatus";

export const LOGINSERVICEURL = `/loginservice/login?redirect=${window.location.origin}`;
export const VEILARBREGISTRERING_URL = "/veilarbregistrering/api";
export const FEATURE_URL = `${VEILARBREGISTRERING_URL}/featuretoggle`;
export const OPPDATER_KONTEKST_URL = "/modiacontextholder/api/context";
export const BRUKER_KONTEKST_URL = "/modiacontextholder/api/context/aktivbruker";

const PAM_JANZZ_URL = "/pam-janzz/rest";
const STYRK_URL = `${PAM_JANZZ_URL}/typeahead/yrke-med-styrk08`;

interface BrukerIKontekstData {
  aktivBruker: string;
}

export const getCookie = (name: string) => {
  const re = new RegExp(`${name}=([^;]+)`);
  const match = re.exec(document.cookie);
  return match !== null ? match[1] : "";
};

export function getHeaders() {
  return new Headers({
    "Content-Type": "application/json",
    NAV_CSRF_PROTECTION: getCookie("NAV_CSRF_PROTECTION"),
    "Nav-Consumer-Id": "arbeidssokerregistrering-veileder",
  });
}

export const MED_CREDENTIALS = {
  credentials: "same-origin" as RequestCredentials,
};

export function hentRegistreringStatus() {
  return fetchToJson({
    url: leggTilFnrForPersonbruker(`${VEILARBREGISTRERING_URL}/startregistrering`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
  });
}

export function registrerBruker(data: RegistrerBrukerData, registreringType: RegistreringType) {
  const endepunkt =
    registreringType === RegistreringType.SYKMELDT_REGISTRERING
      ? "fullfoersykmeldtregistrering"
      : "fullfoerordinaerregistrering";

  return fetchToJson({
    url: leggTilFnrOgEnhet(`${VEILARBREGISTRERING_URL}/${endepunkt}`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
      method: "post",
      body: JSON.stringify(data),
    },
  });
}

export function startReaktivering() {
  return fetchToJson({
    url: leggTilFnrForPersonbruker(`${VEILARBREGISTRERING_URL}/fullfoerreaktivering`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
      method: "post",
      body: JSON.stringify({}),
    },
  });
}

export function opprettKontaktmegOppgave() {
  return fetchToJson({
    url: leggTilFnrForPersonbruker(`${VEILARBREGISTRERING_URL}/oppgave`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
      method: "post",
      body: JSON.stringify({ oppgaveType: "OPPHOLDSTILLATELSE" }),
    },
  });
}

export function oppdaterAktivBruker(brukerFnr: string) {
  return fetchToJson({
    url: OPPDATER_KONTEKST_URL,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
      method: "post",
      body: JSON.stringify({
        eventType: "NY_AKTIV_BRUKER",
        verdi: brukerFnr,
      }),
    },
  });
}

export function hentKontaktinfo() {
  return fetchToJson({
    url: leggTilFnrForPersonbruker(`${VEILARBREGISTRERING_URL}/person/kontaktinfo`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
    recoverWith: () => ({}),
  });
}

export function hentStyrkkodeForSisteStillingFraAAReg() {
  return fetchToJson({
    url: leggTilFnrForPersonbruker(`${VEILARBREGISTRERING_URL}/sistearbeidsforhold`),
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
    recoverWith: () => ({
      arbeidsgiver: null,
      stilling: null,
      styrk: null,
      fra: null,
      til: null,
    }),
  });
}

export function hentStillingFraPamGittStyrkkode(styrk: string) {
  return fetchToJson({
    url: `${PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=${styrk}`,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
    recoverWith: () => ({ konseptMedStyrk08List: [] }),
  });
}

export function hentStillingMedStyrk08(sokestreng: string) {
  return fetchToJson({
    url: `${STYRK_URL}?q=${sokestreng}`,
    config: {
      ...{ redirect: "manual" },
      headers: getHeaders(),
    },
    recoverWith: () => ({ typeaheadYrkeList: [] }),
  });
}

export function hentBrukerIKontekst() {
  return fetchToJson<BrukerIKontekstData>({
    url: BRUKER_KONTEKST_URL,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
  });
}

export function hentFeatureToggles() {
  const parameters = alleFeatureToggles.map((element) => "feature=" + element).join("&");
  return fetchToJson({
    url: `${FEATURE_URL}?${parameters}`,
    config: {
      ...MED_CREDENTIALS,
      headers: getHeaders(),
    },
    recoverWith: () => ({}),
  });
}
