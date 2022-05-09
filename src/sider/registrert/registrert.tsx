import * as React from "react";
import cls from "classnames";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import AvsjekkBilde from "./avsjekk-bilde/avsjekk-bilde";
import { erIE } from "../../utils/ie-test";
import { AppState } from "../../reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { MatchProps } from "../../utils/utils";
import { RegistreringType } from "../../ducks/registreringstatus";
import RegistrertSendVidere from "./send-videre-fss/registrert-send-videre";
import "./registrert.less";

interface StateProps {
  state: AppState;
}

type AllProps = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class DuErNaRegistrert extends React.Component<AllProps> {
  hentTekstId(erSykmeldt: boolean): (id: string) => string {
    return (id: string) => {
      return `duernaregistrert-${erSykmeldt ? "sykmeldt" : "ordinaer"}-${id}`;
    };
  }

  render() {
    const registreringType = this.props.state.registreringStatus.data.registreringType;
    const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
    const tittelId = "duernaregistrert-manuell-innholdstittel";
    return (
      <>
        <section className={cls("registrert", { erIE: erIE(), "registrert-fss": true })}>
          <div className={cls("registrert__avsjekk", { "registrert__avsjekk-sykmeldt": erSykmeldt })}>
            <AvsjekkBilde />
            <Systemtittel tag="h1" className="registrert__tittel">
              <FormattedMessage id={tittelId} />
            </Systemtittel>
          </div>
          <RegistrertSendVidere />
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  state: state,
});

export default connect(mapStateToProps)(injectIntl(DuErNaRegistrert));
