import { combineReducers } from "redux";
import svar, { State as SvarState } from "./ducks/svar";
import reaktiverBruker, { State as ReaktiveringState } from "./ducks/reaktiverbruker";
import registreringStatus, { State as RegStatusState } from "./ducks/registreringstatus";
import registrerBruker, { State as RegistrerBruker } from "./ducks/registrerbruker";
import oppgaveStatus, { State as OppgaveState } from "./ducks/oppgave";
import logger, { State as LoggerState } from "./ducks/logger";
import sisteStillingFraAAReg, { State as SisteStillingFraAARegState } from "./ducks/siste-stilling-fra-aareg";
import featureToggles, { State as FeatureTogglesState } from "./ducks/feature-toggles";
import oversettelseAvStillingFraAAReg, {
  State as OversettelseAvStillingFraAARegState,
} from "./ducks/oversettelse-av-stilling-fra-aareg";
import defaultStilling, { State as DefaultStillingState } from "./ducks/default-stilling";
import sisteStilling, { State as SisteStillingState } from "./ducks/siste-stilling";
import kontaktinfo, { State as KontaktinfoState } from "./ducks/kontaktinfo";

export interface AppState {
  svar: SvarState;
  registreringStatus: RegStatusState;
  registrerBruker: RegistrerBruker;
  reaktiverBruker: ReaktiveringState;
  oppgaveStatus: OppgaveState;
  sisteStillingFraAAReg: SisteStillingFraAARegState;
  oversettelseAvStillingFraAAReg: OversettelseAvStillingFraAARegState;
  defaultStilling: DefaultStillingState;
  sisteStilling: SisteStillingState;
  featureToggles: FeatureTogglesState;
  logger: LoggerState;
  kontaktinfo: KontaktinfoState;
}

export default combineReducers<AppState>({
  svar,
  registreringStatus,
  registrerBruker,
  reaktiverBruker,
  oppgaveStatus,
  oversettelseAvStillingFraAAReg,
  sisteStillingFraAAReg,
  defaultStilling,
  sisteStilling,
  featureToggles,
  logger,
  kontaktinfo,
});
