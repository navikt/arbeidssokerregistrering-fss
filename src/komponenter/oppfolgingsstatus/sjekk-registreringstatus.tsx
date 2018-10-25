import * as React from 'react';
import { connect } from 'react-redux';
import {
    Data as RegistreringstatusData,
    RegistreringType,
    selectRegistreringstatus
} from '../../ducks/registreringstatus';
import { AppState } from '../../reducer';
import SblRegistrering from '../../sider/sbl-registrering/sbl-registrering';
import AlleredeRegistrert from '../../sider/allerede-registrert/allerede-registrert';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import { selectGradualRolloutNyRegistreringFeatureToggle } from '../../ducks/feature-toggles';
import { sendBrukerTilSblArbeid } from '../../sider/oppsummering/oppsummering-utils';
import InfoForIkkeArbeidssokerUtenOppfolging
    from '../../sider/info-for-ikke-arbeidssoker-uten-oppfolging/info-for-ikke-arbeidssoker-uten-oppfolging';

interface StateProps {
    registreringstatusData: RegistreringstatusData;
    gradualRolloutNyRegistrering: boolean;
}

type Props = StateProps & InjectedIntlProps;

class SjekkRegistreringstatus extends React.PureComponent<Props> {

    render () {

        const { registreringstatusData: { registreringType }, children } = this.props;

        if (registreringType === RegistreringType.ALLEREDE_REGISTRERT) {
            return <AlleredeRegistrert intl={this.props.intl} />;
        } else if (!this.beregnBrukNyRegistrering()) {

            if (registreringType === RegistreringType.SPERRET) {
                return <InfoForIkkeArbeidssokerUtenOppfolging />;
            } else {
                const config = { redirect: sendBrukerTilSblArbeid };
                return <SblRegistrering config={config} />;
            }

        } else {
            return <>{children}</>;
        }

    }

    beregnBrukNyRegistrering(): boolean {
        const { gradualRolloutNyRegistrering, registreringstatusData } = this.props;

        if (registreringstatusData.registreringType === RegistreringType.SPERRET) {
            return false;
        }

        return gradualRolloutNyRegistrering;
    }
}

const mapStateToProps = (state: AppState) => ({
    registreringstatusData: selectRegistreringstatus(state).data,
    gradualRolloutNyRegistrering: selectGradualRolloutNyRegistreringFeatureToggle(state),
});

export default connect(mapStateToProps)(
    injectIntl(SjekkRegistreringstatus)
);