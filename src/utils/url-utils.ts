import { AKTIVITETSPLAN_URL } from "./konstanter";
import { hentBrukerFnr, hentVeilederEnhetId } from "./fss-utils";

const url = window && window.location && window.location.href ? window.location.href : "";

export const lagAktivitetsplanUrl = (fnr?: string) => {
  return `${AKTIVITETSPLAN_URL}/${fnr ? fnr : hentBrukerFnr()}?enhet=${hentVeilederEnhetId()}`;
};

export const lagDetaljeVisningUrl = () => {
  return lagAktivitetsplanUrl() + "&visRegistreringDetaljer=true";
};

export const erProduksjon = () => {
  return url.indexOf("arbeidssokerregistrering.nav.no") > -1;
};

const DEV_DOMAINS = ["dev", "app-q1", "app-q0", "localhost"];

const erITestMiljo = (): boolean => {
  return window.location.hostname.split(".").findIndex((domain) => DEV_DOMAINS.includes(domain)) >= 0;
};

export const utledSpaUrl = (appName: string): string => {
  return erITestMiljo() ? `https://${appName}.intern.dev.nav.no` : `https://${appName}.intern.nav.no`;
};

type LocationType = { search: string };

export const hentQueryParameter = (location: LocationType, parameter: string): string | null =>
  new URLSearchParams(location.search).get(parameter);

export const erNAVMiljo = (miljo: string) =>
  miljo.endsWith(".nav.no") ||
  miljo.endsWith(".adeo.no") ||
  miljo.endsWith(".preprod.local") ||
  miljo.endsWith(".oera.no") ||
  miljo.endsWith(".oera-q.local") ||
  miljo.endsWith(".nav.party");
