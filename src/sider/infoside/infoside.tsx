import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import "./infoside.less";
import LenkeTilbake from "../../komponenter/knapper/lenke-tilbake";
import { Link, Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { MatchProps } from "../../utils/utils";
import Veilederpanel from "nav-frontend-veilederpanel";
import { Normaltekst, Systemtittel, Undertittel } from "nav-frontend-typografi";
import InfoViser from "../../komponenter/info-viser/info-viser";
import { OPPSUMMERING_PATH, START_PATH } from "../../utils/konstanter";
import { AppState } from "../../reducer";
import { selectKontaktinfo, State as KontaktinfoState } from "../../ducks/kontaktinfo";
import { connect } from "react-redux";
import { lagAktivitetsplanUrl } from "../../utils/url-utils";
import { erKlarForFullforing } from "../fullfor/fullfor-utils";
import veilederSvg from "./veileder-syfo.svg";

interface StateProps {
  kontaktinfo: KontaktinfoState;
  state: AppState;
}

type Props = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class Infoside extends React.Component<Props> {
  handleTilbakeBtnClick = (): void => {
    this.props.history.goBack();
  };

  render() {
    if (!erKlarForFullforing(this.props.state)) {
      return <Redirect to={START_PATH} />;
    }

    const fornavn = this.props.kontaktinfo.data.navn?.fornavn;
    let veilederpanelType: "normal" | "plakat" = "plakat";
    let veilederpanelKompakt;

    if (window.matchMedia("(min-width: 768px)").matches) {
      veilederpanelType = "normal";
      veilederpanelKompakt = true;
    } else {
      veilederpanelType = "plakat";
      veilederpanelKompakt = false;
    }

    return (
      <>
        <div className="infoside--forste-rad__bakgrunn" />
        <div className="infoside--forste-rad">
          <Veilederpanel
            type={veilederpanelType}
            svg={<img src={veilederSvg} alt="Informasjon" className="nav-veilederpanel__illustrasjon" />}
            kompakt={veilederpanelKompakt}
          >
            <Undertittel>
              <FormattedMessage id={"infoside-veilederpanel-tittel"} values={{ fornavn }} />
            </Undertittel>

            <Normaltekst>
              <FormattedMessage id="infoside-veilederpanel-tekst" />
            </Normaltekst>
          </Veilederpanel>
        </div>

        <div className="infoside--andre-rad">
          <div className="infoside--andre-rad__container">
            <Systemtittel className="infoside--andre-rad__tittel">
              <FormattedMessage id="infoside-tilbake-full-stilling-tittel" />
            </Systemtittel>
            <ul className="infoside--andre-rad__liste">
              <li className="blokk-xs">
                <FormattedMessage id="infoside-tilbake-full-stilling-tekst-1" />
              </li>
              <li className="blokk-xs">
                <FormattedMessage id="infoside-tilbake-full-stilling-tekst-2" />
              </li>
            </ul>
          </div>
          <hr className="infoside--andre-rad__divider" />
          <InfoViser tekstId="infoside-tilbake-full-stilling-info" className="infoside--andre-rad__info-viser" />
        </div>

        <div className="infoside--tredje-rad">
          <Systemtittel className="blokk-m infoside--tredje-rad__tittel">
            <FormattedMessage id="infoside-trenger-plan-tittel" />
          </Systemtittel>

          <div className="infoside--tredje-rad__knapper">
            <Link className="knapp" to={OPPSUMMERING_PATH}>
              <FormattedMessage id="infoside-knapp-uenig" />
            </Link>
            <a href={lagAktivitetsplanUrl()} className="knapp">
              <FormattedMessage id="infoside-knapp-enig" />
            </a>
          </div>
        </div>

        <LenkeTilbake onClick={this.handleTilbakeBtnClick} />
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  kontaktinfo: selectKontaktinfo(state),
  state: state,
});

export default connect(mapStateToProps)(withRouter(injectIntl(Infoside)));
