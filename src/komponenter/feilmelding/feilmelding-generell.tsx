import * as React from "react";
import { FormattedMessage } from "react-intl";
import Feilmelding from "./feilmelding";
import { Normaltekst } from "nav-frontend-typografi";
import { uniLogger } from "../../metrikker/uni-logger";

function FeilmeldingGenerell({ tekstId }: { tekstId?: string }) {
  const id = tekstId ? tekstId : "feilmelding-generell";
  uniLogger("arbeidssokerregistrering.error", { feilType: id });
  return (
    <Feilmelding>
      <Normaltekst>
        <FormattedMessage id={id} />
      </Normaltekst>
    </Feilmelding>
  );
}

export default FeilmeldingGenerell;
