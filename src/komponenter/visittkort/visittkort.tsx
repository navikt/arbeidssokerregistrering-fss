import * as React from "react";
import "./visittkort.less";
import { AsyncNavspa, AsyncSpaConfig } from "@navikt/navspa";
import { utledSpaUrl } from "../../utils/url-utils";
import NavFrontendSpinner from "nav-frontend-spinner";
import { hentBrukerFnr, hentVeilederEnhetId } from "../../utils/fss-utils";

interface SpaProps {
  enhet?: string;
  fnr: string;
}

interface VisittKortProps extends SpaProps {
  tilbakeTilFlate: string;
  visVeilederVerktoy: boolean;
  skjulEtiketter: boolean;
}

export enum SpaName {
  DIALOG = "arbeidsrettet-dialog",
  VEILARBVISITTKORTFS = "veilarbvisittkortfs",
}

export const visittkortAsyncConfig: AsyncSpaConfig = {
  appName: SpaName.VEILARBVISITTKORTFS,
  appBaseUrl: utledSpaUrl(SpaName.VEILARBVISITTKORTFS),
  loader: <NavFrontendSpinner type="L" className="veilarbpersonflatefs-visittkort-spinner" />,
};

const VisittkortSpa: React.ComponentType<VisittKortProps> =
  AsyncNavspa.importer<VisittKortProps>(visittkortAsyncConfig);

const Visittkort: () => JSX.Element = () => {
  const fnr = hentBrukerFnr();
  const enhetId = hentVeilederEnhetId();
  return (
    <div className="visittkortfs-wrapper">
      <VisittkortSpa
        fnr={fnr || ""}
        enhet={enhetId || ""}
        tilbakeTilFlate="veilarbpersonflatefs"
        visVeilederVerktoy={false}
        skjulEtiketter={true}
      />
    </div>
  );
};

export default Visittkort;
