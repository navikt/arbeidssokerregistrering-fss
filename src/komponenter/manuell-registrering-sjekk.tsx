import * as React from "react";
import { hentBrukerFnr, hentVeilederEnhetId } from "../utils/fss-utils";
import ManglerKontekst from "../sider/mangler-kontekst";

class ManuellRegistreringSjekk extends React.Component {
  manglerKontekst = (): boolean => {
    const harIkkeFnr = hentBrukerFnr() === null;
    const harIkkeEnhetId = hentVeilederEnhetId() === null;
    return harIkkeFnr || harIkkeEnhetId;
  };

  render() {
    if (this.manglerKontekst()) {
      return <ManglerKontekst />;
    }

    return this.props.children;
  }
}

export default ManuellRegistreringSjekk;
