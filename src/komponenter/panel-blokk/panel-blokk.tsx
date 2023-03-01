import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import classNames from "classnames";
import Panel from "nav-frontend-paneler";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { getIntlMessage } from "../../utils/utils";

interface PanelBlokkProps {
  tittelId?: string;
  tittelVerdier?: Record<string, any>;
  tittelCssNavnVariant?: string;
  cssVariant?: string;
  beskrivelseId?: string;
  children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
}

function PanelBlokk({
  tittelId,
  beskrivelseId,
  tittelCssNavnVariant,
  cssVariant,
  tittelVerdier,
  intl,
  children,
}: PanelBlokkProps & WrappedComponentProps) {
  return (
    <Panel className={classNames("panel-blokk padding-vertikalt-standard mmb", cssVariant)}>
      {tittelId ? (
        <Sidetittel className={`panel-blokk-overskrift ${tittelCssNavnVariant}`}>
          <span>
            {intl.formatMessage(
              {
                id: tittelId,
                defaultMessage: getIntlMessage(intl.messages, tittelId),
              },
              tittelVerdier
            )}
          </span>
        </Sidetittel>
      ) : null}
      {beskrivelseId ? (
        <Normaltekst className="panel-blokk-beskrivelse">
          <span
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: beskrivelseId }),
            }}
          />
        </Normaltekst>
      ) : null}
      {children}
    </Panel>
  );
}

export default injectIntl(PanelBlokk);
