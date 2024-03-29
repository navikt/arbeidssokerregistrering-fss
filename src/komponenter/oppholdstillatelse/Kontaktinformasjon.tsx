import * as React from "react";
import Panel from "nav-frontend-paneler";
import { Undertittel, Undertekst } from "nav-frontend-typografi";

import "./kontaktinformasjon.less";

interface Props {
  telefonnummer: string | undefined;
  kilde: string;
}

class Kontaktinformasjon extends React.Component<Props> {
  render() {
    const { telefonnummer, kilde, ...children } = this.props;
    return (
      <Panel border className="kontaktinfo-kort" {...children}>
        <Undertittel>{`Telefonnummer lagret hos ${kilde}`}</Undertittel>
        <Undertittel className="informasjon">{telefonnummer}</Undertittel>
        <Undertekst>{`Kilde: ${kilde}`}</Undertekst>
      </Panel>
    );
  }
}

export default Kontaktinformasjon;
