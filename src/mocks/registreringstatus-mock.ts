import { RegistreringType, Servicegruppe, Formidlingsgruppe } from "../ducks/registreringstatus";
import { Data as RegStatusData } from "../ducks/registreringstatus";

export default {
  underOppfolging: false,
  jobbetSeksAvTolvSisteManeder: false,
  //registreringType: RegistreringType.ORDINAER_REGISTRERING,
  registreringType: RegistreringType.SPERRET,
  servicegruppe: Servicegruppe.IVURD,
  formidlingsgruppe: Formidlingsgruppe.IARBS,
  geografiskTilknytning: "0807",
  rettighetsgruppe: "IYT",
} as RegStatusData & any;
