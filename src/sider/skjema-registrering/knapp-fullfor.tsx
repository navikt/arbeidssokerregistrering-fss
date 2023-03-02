import * as React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import KnappBase from "nav-frontend-knapper";
import { FormattedMessage, MessageFormatElement } from "react-intl";

interface Props {
  disabled?: boolean;
  onClick: () => void;
  intl: Record<string, string> | Record<string, MessageFormatElement[]>;
}

function KnappFullfor({ disabled, onClick }: Props) {
  return (
    <KnappBase type="hoved" className="knapp-neste" disabled={disabled} onClick={onClick} data-testid="neste">
      <Normaltekst>
        <FormattedMessage id={"fullfor-knapp"}></FormattedMessage>
      </Normaltekst>
    </KnappBase>
  );
}

export default KnappFullfor;
