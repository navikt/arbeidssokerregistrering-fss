import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Navigate, Route, Routes, useLocation, useParams, useNavigate } from "react-router-dom";

import Banner from "./komponenter/banner/banner";
import ProgressBarContainer from "./komponenter/progress-bar/progress-bar-container";
import Sideanimasjon from "./komponenter/sideanimasjon/sideanimasjon";
import AlleredeRegistrertFss from "./sider/allerede-registrert-fss/allerede-registrert-fss";
import {
  ALLEREDE_REGISTRERT_PATH,
  DU_ER_NA_REGISTRERT_PATH,
  FULLFOR_PATH,
  INFOSIDE_PATH,
  INNGANGSSPORSMAL_PATH,
  OPPSUMMERING_PATH,
  REAKTIVERING_PATH,
  SKJEMA_PATH,
  SKJEMA_SYKEFRAVAER_PATH,
  START_PATH,
} from "./utils/konstanter";
import Inngangssporsmal from "./sider/skjema-sykefravaer/inngangssporsmal";
import Infoside from "./sider/infoside/infoside";
import KreverReaktivering from "./sider/krever-reaktivering/krever-reaktivering";
import SkjemaRegistrering from "./sider/skjema-registrering/skjema-registrering";
import SkjemaSykefravaerNyArbeidsgiver from "./sider/skjema-sykefravaer/skjema-sykefravaer-ny-arbeidsgiver";
import SkjemaSykefravaerSammeArbeidsgiver from "./sider/skjema-sykefravaer/skjema-sykefravaer-samme-arbeidsgiver";
import SkjemaSykefravaerSammeArbeidsgiverNyStilling from "./sider/skjema-sykefravaer/skjema-sykefravaer-samme-arbeidsgiver-ny-stilling";
import SkjemaSykefravaerUsikker from "./sider/skjema-sykefravaer/skjema-sykefravaer-usikker";
import OppsummeringSykmeldt from "./sider/oppsummering/oppsummering-sykmeldt";
import Fullfor from "./sider/fullfor/fullfor";
import DuErNaRegistrert from "./sider/registrert/registrert";
import { AppState } from "./reducer";
import { Data as RegistreringstatusData, RegistreringType, selectRegistreringstatus } from "./ducks/registreringstatus";
import RedirectAll from "./komponenter/redirect-all";
import { selectReaktiveringStatus } from "./ducks/reaktiverbruker";
import { STATUS } from "./ducks/api-utils";
import { erKlarForFullforing } from "./sider/fullfor/fullfor-utils";
import { Data as FeatureToggleData, selectFeatureToggles } from "./ducks/feature-toggles";
import TjenesteOppdateres from "./sider/tjeneste-oppdateres";
import { RouteHerokuMock } from "./mocks/HerokuappEndreMockRegistreringLoep/herokuapp-endre-mock-registrering-loep";
import { setInngangAapAction, setInngangSykefravaerAction } from "./ducks/logger";
import RegistreringArbeidssokerSykmeldtFss from "./sider/startside/registrering-sykmeldt-fss";
import RegistreringArbeidssokerFss from "./sider/startside/registrering-arbeidssoker-fss";
import OppsummeringOrdinaer from "./sider/oppsummering/oppsummering-ordinaer";
import { hentQueryParameter } from "./utils/url-utils";

interface StateProps {
  registreringstatusData: RegistreringstatusData;
  reaktivertStatus: string;
  featureToggles: FeatureToggleData;
  state: AppState;
}

interface DispatchProps {
  setInngangFraSykefravaer: () => void;
  setInngangAapAction: () => void;
}

type AllProps = StateProps & any & DispatchProps;

export const withRouter = (Component) => (props) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  return <Component {...props} {...{ location, params, navigate }} />;
};

function AppRoutes(props: AllProps) {
  const kommerFraSykefravaer = () => {
    const { registreringstatusData, location } = props;
    const erFraSykefravaer = hentQueryParameter(location, "fraSykefravaer") === "true";

    return (
      registreringstatusData.registreringType === RegistreringType.SYKMELDT_REGISTRERING &&
      erFraSykefravaer &&
      location.pathname === START_PATH
    );
  };

  const kommerAap = () => {
    return hentQueryParameter(this.props.location, "fraAap") === "true";
  };

  if (kommerAap()) {
    props.setInngangAapAction();
  }

  if (kommerFraSykefravaer()) {
    props.setInngangFraSykefravaer();
  }

  const { registreringstatusData, reaktivertStatus, featureToggles, location } = props;
  const erNede = featureToggles["arbeidssokerregistrering.nedetid"];
  const { registreringType } = registreringstatusData;
  const visSykefravaerSkjema = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
  const visOrdinaerSkjema = !visSykefravaerSkjema;
  const klarForFullforing = erKlarForFullforing(props.state);
  const queryParams = location.search;

  if (registreringType === RegistreringType.ALLEREDE_REGISTRERT) {
    return <RedirectAll to={ALLEREDE_REGISTRERT_PATH} component={AlleredeRegistrertFss} />;
  } else if (registreringType === RegistreringType.REAKTIVERING && reaktivertStatus !== STATUS.OK) {
    if (erNede) {
      return <RedirectAll to={"/"} component={TjenesteOppdateres} />;
    }
    return <RedirectAll to={REAKTIVERING_PATH} component={KreverReaktivering} />;
  } else if (this.kommerFraSykefravaer()) {
    return <RedirectAll to={INNGANGSSPORSMAL_PATH} component={Inngangssporsmal} />;
  }

  return (
    <Routes>
      {RouteHerokuMock}
      <Route path="/" element={<Banner />} />
      <Route path="/:url" element={<ProgressBarContainer />} />

      <Sideanimasjon>
        <Routes>
          {erNede ? <RedirectAll to={"/"} component={TjenesteOppdateres} /> : null}
          {klarForFullforing || reaktivertStatus === STATUS.OK ? (
            <Route path={DU_ER_NA_REGISTRERT_PATH} element={<DuErNaRegistrert />} />
          ) : null}

          {visOrdinaerSkjema ? (
            <Routes>
              <Route path={START_PATH} element={<RegistreringArbeidssokerFss />} />
              <Route path={`${SKJEMA_PATH}/:id`} element={<SkjemaRegistrering />} />
              <Route path={FULLFOR_PATH} element={<Fullfor />} />
              <Route path={OPPSUMMERING_PATH} element={<OppsummeringOrdinaer />} />
              <Navigate to={START_PATH} replace />
            </Routes>
          ) : null}
          {visSykefravaerSkjema ? (
            <Routes>
              <Route path={START_PATH} element={<RegistreringArbeidssokerSykmeldtFss />} />
              <Route path={INFOSIDE_PATH} element={<Infoside />} />
              <Route path={INNGANGSSPORSMAL_PATH} element={<Inngangssporsmal />} />
              <Route path={`${SKJEMA_SYKEFRAVAER_PATH}/1/:id`} element={<SkjemaSykefravaerSammeArbeidsgiver />} />
              <Route
                path={`${SKJEMA_SYKEFRAVAER_PATH}/2/:id`}
                element={<SkjemaSykefravaerSammeArbeidsgiverNyStilling />}
              />
              <Route path={`${SKJEMA_SYKEFRAVAER_PATH}/3/:id`} element={<SkjemaSykefravaerNyArbeidsgiver />} />
              <Route path={`${SKJEMA_SYKEFRAVAER_PATH}/4/:id`} element={<SkjemaSykefravaerUsikker />} />
              <Route path={OPPSUMMERING_PATH} element={<OppsummeringSykmeldt />} />
              <Navigate to={START_PATH + queryParams} replace />
            </Routes>
          ) : null}
        </Routes>
      </Sideanimasjon>
    </Routes>
  );
}

const mapStateToProps = (state: AppState) => ({
  registreringstatusData: selectRegistreringstatus(state).data,
  reaktivertStatus: selectReaktiveringStatus(state),
  featureToggles: selectFeatureToggles(state),
  state: state,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  setInngangFraSykefravaer: () => dispatch(setInngangSykefravaerAction()),
  setInngangAapAction: () => dispatch(setInngangAapAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppRoutes));
