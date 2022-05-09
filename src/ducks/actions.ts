import { ActionTypes as RegStatusActionTypes } from "./registreringstatus";
import { ActionTypes as SvarActionTypes } from "./svar";
import { ActionTypes as SisteStillingFraAARegActionTypes } from "./siste-stilling-fra-aareg";
import { ActionTypes as OversettelseAvStillingFraAARegActionTypes } from "./oversettelse-av-stilling-fra-aareg";
import { ActionTypes as OpprettKontaktmegOppgaveActionTypes } from "./oppgave";
import { ActionTypes as RegistrerBrukerActionTypes } from "./registrerbruker";
import { ActionTypes as ReaktiverBrukerActionTypes } from "./reaktiverbruker";
import { ActionTypes as FeatureTogglesActionTypes } from "./feature-toggles";
import { ActionTypes as KontaktinfoActionTypes } from "./kontaktinfo";

type ActionTypes =
  | RegStatusActionTypes
  | SvarActionTypes
  | RegistrerBrukerActionTypes
  | ReaktiverBrukerActionTypes
  | OversettelseAvStillingFraAARegActionTypes
  | OpprettKontaktmegOppgaveActionTypes
  | SisteStillingFraAARegActionTypes
  | FeatureTogglesActionTypes
  | KontaktinfoActionTypes;

export default ActionTypes;
