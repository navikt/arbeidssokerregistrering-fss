import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { WrappedComponentProps, injectIntl } from "react-intl";

import Skjema from "../../komponenter/skjema/skjema";
import { endreSvarAction, SporsmalId, State as SvarState } from "../../ducks/svar";
import { hentSvar, Svar } from "../../ducks/svar-utils";
import { AppState } from "../../reducer";
import { OPPSUMMERING_PATH, SKJEMA_SYKEFRAVAER_PATH } from "../../utils/konstanter";
import { vanligFlyt } from "../../komponenter/skjema/skjema-utils";
import { RegistreringType } from "../../ducks/registreringstatus";
import { sammeArbeidsgiverSporsmaleneConfig } from "./skjema-sykefravaer-sporsmalene";

interface DispatchProps {
  endreSvar: (sporsmalId: string, svar: Svar) => void;
}

interface StateProps {
  svarState: SvarState;
}

type Props = DispatchProps & StateProps & WrappedComponentProps & any;

class SkjemaSykefravaerSammeArbeidsgiver extends React.Component<Props> {
  render() {
    const { endreSvar, intl, svarState, location, match, history } = this.props;
    const fellesProps = {
      endreSvar: (sporsmalId: SporsmalId, svar: Svar) => {
        endreSvar(sporsmalId, svar);
      },
      intl: intl,
      hentAvgittSvar: (sporsmalId: SporsmalId) => hentSvar(svarState, sporsmalId),
    };

    const regType = RegistreringType.SYKMELDT_REGISTRERING;

    const sporsmal = sammeArbeidsgiverSporsmaleneConfig(fellesProps, regType).map((spmElement) => spmElement.element);

    return (
      <Skjema
        config={vanligFlyt}
        baseUrl={`${SKJEMA_SYKEFRAVAER_PATH}/2`}
        endUrl={OPPSUMMERING_PATH}
        {...{ location, match, history }}
      >
        {sporsmal}
      </Skjema>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaSykefravaerSammeArbeidsgiver));
