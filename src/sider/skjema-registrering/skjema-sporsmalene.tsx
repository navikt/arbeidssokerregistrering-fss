import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SporsmalId } from '../../ducks/svar';
import AndreForhold from './sporsmal/sporsmal-andre-forhold';
import SporsmalDinSituasjon from './sporsmal/sporsmal-din-situasjon';
import HelseHinder from './sporsmal/sporsmal-helse-hinder';
import SisteStilling from './sporsmal/sporsmal-siste-stilling/siste-stilling';
import Utdanningsporsmal from './sporsmal/sporsmal-utdanning';
import UtdanningGodkjentSporsmal from './sporsmal/sporsmal-utdanning-godkjent';
import UtdanningBestattSporsmal from './sporsmal/sporsmal-utdanning-bestatt';
import { Link } from 'react-router-dom';
import { ingenYrkesbakgrunn } from '../../ducks/siste-stilling';
import OppsummeringElement from '../../sider/oppsummering/oppsummering-element';
import {
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from '../../ducks/svar-utils';

const sporsmaleneConfig = (sporsmalProps, regType, state) => [
    {
        id: SporsmalId.dinSituasjon,
        element: (
            <SporsmalDinSituasjon
                key={SporsmalId.dinSituasjon}
                sporsmalId={SporsmalId.dinSituasjon}
                {...sporsmalProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.dinSituasjon}
                sporsmalId={SporsmalId.dinSituasjon}
            >
                <strong>Din Situasjon: &nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.sisteStilling,
        element: (
            <SisteStilling
                key={SporsmalId.sisteStilling}
                sporsmalId={SporsmalId.sisteStilling}
                {...sporsmalProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.sisteStilling}
                sporsmalId={SporsmalId.sisteStilling}
                tekst={state.sisteStilling && state.sisteStilling.data.stilling.label}
                skjul={state.sisteStilling && state.sisteStilling.data.stilling === ingenYrkesbakgrunn}
            >
                <strong><FormattedMessage id="oppsummering-sistestilling-fortekst"/>&nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.utdanning,
        element: (
            <Utdanningsporsmal
                key={SporsmalId.utdanning}
                sporsmalId={SporsmalId.utdanning}
                {...sporsmalProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.utdanning}
                sporsmalId={SporsmalId.utdanning}
                skjulHvisSvarErLik={UtdanningSvar.INGEN_SVAR}
            >
                <strong>Utdannelse: &nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.utdanningGodkjent,
        element: (
            <UtdanningGodkjentSporsmal
                key={SporsmalId.utdanningGodkjent}
                sporsmalId={SporsmalId.utdanningGodkjent}
                {...sporsmalProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.utdanningGodkjent}
                sporsmalId={SporsmalId.utdanningGodkjent}
                skjulHvisSvarErLik={UtdanningGodkjentSvar.INGEN_SVAR}
            >
                <strong>Utdannelse godkjent: &nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.utdanningBestatt,
        element: (
            <UtdanningBestattSporsmal
                key={SporsmalId.utdanningBestatt}
                sporsmalId={SporsmalId.utdanningBestatt}
                {...sporsmalProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.utdanningBestatt}
                sporsmalId={SporsmalId.utdanningBestatt}
                skjulHvisSvarErLik={UtdanningBestattSvar.INGEN_SVAR}
            >
                <strong>Utdanning bestått: &nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.helseHinder,
        element: (
            <HelseHinder
                key={SporsmalId.helseHinder}
                sporsmalId={SporsmalId.helseHinder}
                {...sporsmalProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.helseHinder}
                sporsmalId={SporsmalId.helseHinder}
            >
                <strong>Helse hinder: &nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.andreForhold,
        element: (
            <AndreForhold
                key={SporsmalId.andreForhold}
                sporsmalId={SporsmalId.andreForhold}
                {...sporsmalProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.andreForhold}
                sporsmalId={SporsmalId.andreForhold}
            >
                <strong>Andre forhold: &nbsp;</strong>
            </OppsummeringElement>
        )
    }
];

export const finnLenkeEndreElementForOrdinaer = (sporsmalProps, regType, sporsmalId) => {
    const index = sporsmaleneConfig(sporsmalProps, regType, {})
        .findIndex(data => data.id === sporsmalId);
    if (index >= 0) {
        return (
            <Link
                className="lenke"
                to={`/skjema/${index}`}
            >
                Endre
            </Link>
        );
    } else {
        return null;
    }
};

export const hentElementOppsummering = (state) =>
    sporsmaleneConfig({}, '', state).map((spmElement) => {
        return spmElement.elementOppsummering;
    });

const hentRegistreringSporsmalene = (sporsmalProps, regType) =>
    sporsmaleneConfig(sporsmalProps, regType, {}).map((spmElement) => {
        return spmElement.element;
    });

export default hentRegistreringSporsmalene;
