import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { AppState } from "../../reducer";
import { hentKontaktinfo, selectKontaktinfo, State as KontaktinfoState } from "../../ducks/kontaktinfo";
import { hentAutentiseringsInfo, selectAutentiseringsinfo, State as AuthState } from "../../ducks/autentiseringsinfo";
import {
  hentRegistreringStatus,
  selectRegistreringstatus,
  State as RegistreringstatusState,
} from "../../ducks/registreringstatus";
import {
  hentFeatureToggles,
  selectFeatureTogglesState,
  State as FeatureToggleState,
} from "../../ducks/feature-toggles";
import Innholdslaster from "../innholdslaster/innholdslaster";
import TjenesteOppdateres from "../../sider/tjeneste-oppdateres";
import { STATUS } from "../../ducks/api-utils";
import Loader from "../loader/loader";
import FeilmeldingGenerell from "../feilmelding/feilmelding-generell";
import { erIFSS } from "../../utils/fss-utils";

interface StateProps {
  kontaktinfo: KontaktinfoState;
  autentiseringsinfo: AuthState;
  registreringstatus: RegistreringstatusState;
  featuretoggles: FeatureToggleState;
}

interface DispatchProps {
  hentAutentiseringsInfo: () => Promise<void | unknown>;
  hentRegistreringStatus: () => void;
  hentFeatureToggle: () => Promise<void | unknown>;
  hentKontaktinfo: () => Promise<void | unknown>;
}

type Props = StateProps & DispatchProps;

export class HentInitialData extends React.Component<Props> {
  componentDidMount() {
    this.props.hentFeatureToggle().then(() => {
      this.props.hentRegistreringStatus();
      this.props.hentKontaktinfo();
    });
  }

  render() {
    const { children, registreringstatus, autentiseringsinfo, kontaktinfo, featuretoggles } = this.props;
    const erNede = featuretoggles.data["arbeidssokerregistrering.nedetid"];
    if (erNede) {
      return <TjenesteOppdateres />;
    }

    const feilmelding =
      erIFSS() && registreringstatus.status === STATUS.ERROR
        ? "feilhandtering-ikke-tilgang-aareg"
        : "feilmelding-generell";

    return (
      <Innholdslaster
        feilmeldingKomponent={<FeilmeldingGenerell tekstId={feilmelding} />}
        avhengigheter={[registreringstatus, kontaktinfo, autentiseringsinfo, featuretoggles]}
        storrelse="XXL"
        loaderKomponent={<Loader />}
      >
        {children}
      </Innholdslaster>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  autentiseringsinfo: selectAutentiseringsinfo(state),
  kontaktinfo: selectKontaktinfo(state),
  registreringstatus: selectRegistreringstatus(state),
  featuretoggles: selectFeatureTogglesState(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
  hentAutentiseringsInfo: () => dispatch(hentAutentiseringsInfo()),
  hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
  hentFeatureToggle: () => dispatch(hentFeatureToggles()),
  hentKontaktinfo: () => dispatch(hentKontaktinfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);
