import * as React from "react";
import { RadioPanel } from "nav-frontend-skjema";
import classNames from "classnames";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Svar } from "../../ducks/svar-utils";

interface AlternativProps {
  hentAvgittSvar: () => Svar | undefined;
  svar: Svar;
  avgiSvar: (svar: Svar) => void;
  getTekstId: (svar: Svar) => string;
  className?: string;
}

function Alternativ(props: AlternativProps & WrappedComponentProps) {
  const tekstId = props.getTekstId(props.svar);
  const tekst = props.intl.formatMessage({ id: tekstId });

  return (
    <div className={classNames("alternativ-wrapper", props.className)}>
      <RadioPanel
        onChange={() => props.avgiSvar(props.svar)}
        name={"alternativ"}
        label={tekst}
        value={tekst}
        checked={props.hentAvgittSvar() === props.svar}
      />
    </div>
  );
}

export default injectIntl(Alternativ);
