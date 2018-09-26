import {
    AndreForholdSvar,
    DinSituasjonSvar, HelseHinderSvar,
    SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from '../ducks/svar-utils';
import {SporsmalId} from "../ducks/svar";

const svarMock = [
    {sporsmalId: SporsmalId.dinSituasjon, svar: DinSituasjonSvar.ER_PERMITTERT},
    {sporsmalId: SporsmalId.sisteStilling, svar: SisteStillingSvar.HAR_HATT_JOBB},
    {sporsmalId: SporsmalId.utdanning, svar: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER},
    {sporsmalId: SporsmalId.utdanningGodkjent, svar: UtdanningGodkjentSvar.NEI},
    {sporsmalId: SporsmalId.utdanningBestatt, svar: UtdanningBestattSvar.JA},
    {sporsmalId: SporsmalId.helseHinder, svar: HelseHinderSvar.NEI},
    {sporsmalId: SporsmalId.andreForhold, svar: AndreForholdSvar.NEI},
];

export default svarMock;