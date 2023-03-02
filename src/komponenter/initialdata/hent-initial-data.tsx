import * as React from "react";
import { connect } from "react-redux";
import { AnyAction} from "redux";
import { AppState } from "../../reducer";
import { hentKontaktinfo, selectKontaktinfo, State as KontaktinfoState } from "../../ducks/kontaktinfo";
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
import { ThunkDispatch } from "redux-thunk";

interface StateProps {
  kontaktinfo: KontaktinfoState;
  registreringstatus: RegistreringstatusState;
  featuretoggles: FeatureToggleState;
}

interface DispatchProps {
  hentRegistreringStatus: () => void;
  hentFeatureToggle: () => Promise<void | unknown>;
  hentKontaktinfo: () => Promise<void | unknown>;
}

type Props = StateProps & DispatchProps & { children?: React.ReactNode | undefined };

export class HentInitialData extends React.Component<Props> {
  componentDidMount() {
    this.props.hentFeatureToggle().then(() => {
      this.props.hentRegistreringStatus();
      this.props.hentKontaktinfo();
    });
  }

  render() {
    const { children, registreringstatus, kontaktinfo, featuretoggles } = this.props;
    const erNede = featuretoggles.data["arbeidssokerregistrering.nedetid"];
    if (erNede) {
      return <TjenesteOppdateres />;
    }

    const feilmelding =
      registreringstatus.status === STATUS.ERROR ? "feilhandtering-ikke-tilgang-aareg" : "feilmelding-generell";

    return (
      <Innholdslaster
        feilmeldingKomponent={<FeilmeldingGenerell tekstId={feilmelding} />}
        avhengigheter={[registreringstatus, kontaktinfo, featuretoggles]}
        storrelse="XXL"
        loaderKomponent={<Loader />}
      >
        {children}
      </Innholdslaster>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  kontaktinfo: selectKontaktinfo(state),
  registreringstatus: selectRegistreringstatus(state),
  featuretoggles: selectFeatureTogglesState(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>): DispatchProps => ({
  hentRegistreringStatus: () => dispatch(hentRegistreringStatus()),
  hentFeatureToggle: () => dispatch(hentFeatureToggles()),
  hentKontaktinfo: () => dispatch(hentKontaktinfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);
