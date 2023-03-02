import * as React from "react";
import { connect } from "react-redux";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { AnyAction } from "redux";

import LastInnSisteStilling from "./last-inn-siste-stilling";
import { endreSvarAction, resetSvarAction, SporsmalId, State as SvarState } from "../../ducks/svar";
import { hentSvar, Svar } from "../../ducks/svar-utils";
import { AppState } from "../../reducer";
import Skjema from "../../komponenter/skjema/skjema";
import { OPPSUMMERING_PATH, SKJEMA_PATH } from "../../utils/konstanter";
import {
  defaultConfigForSporsmalsflyt,
  nullStillSporsmalSomIkkeSkalBesvares,
} from "../../komponenter/skjema/skjema-utils";
import { RegistreringType } from "../../ducks/registreringstatus";
import hentRegistreringSporsmalene from "./skjema-sporsmalene";
import { ThunkDispatch } from "redux-thunk";

interface DispatchProps {
  resetSvar: (sporsmalId: SporsmalId) => void;
  endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
}

interface StateProps {
  svarState: SvarState;
}

type Props = DispatchProps & StateProps & WrappedComponentProps & any;

class SkjemaRegistrering extends React.Component<Props> {
  render() {
    const { endreSvar, resetSvar, intl, svarState, location, match, history } = this.props;
    const sporsmalProps = {
      endreSvar: (sporsmalId: SporsmalId, svar: Svar) => {
        nullStillSporsmalSomIkkeSkalBesvares(sporsmalId, svar, endreSvar, resetSvar);

        endreSvar(sporsmalId, svar);
      },
      intl: intl,
      hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
    };

    const regType: RegistreringType = RegistreringType.ORDINAER_REGISTRERING;
    const registreringSporsmalElementene = hentRegistreringSporsmalene(sporsmalProps, regType);

    return (
      <LastInnSisteStilling>
        <Skjema
          config={defaultConfigForSporsmalsflyt}
          baseUrl={SKJEMA_PATH}
          endUrl={OPPSUMMERING_PATH}
          {...{ location, match, history }}
        >
          {registreringSporsmalElementene}
        </Skjema>
      </LastInnSisteStilling>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  svarState: state.svar,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>): DispatchProps => ({
  resetSvar: (sporsmalId) => dispatch(resetSvarAction(sporsmalId)),
  endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaRegistrering));
