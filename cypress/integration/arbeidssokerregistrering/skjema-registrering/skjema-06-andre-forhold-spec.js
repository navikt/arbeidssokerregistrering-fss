import * as utils from '../../../utils';
import * as skjemaVerdier from '../../../fixtures/ordinaerregistrering-valg.json';


describe('/skjema/6 - Har du andre problemer med å søke eller være i jobb?', () => {
    beforeEach(() => {
        utils.configureCypress('registrering');
    });
    it('Navigerer til korrekt skjema', () => {
        cy.visit('/');
        cy.get('[data-testid="start-registrering"]')
            .click();
        utils.clickOptionThenNext(5); // Velg "Har ikke vært i jobb de siste 2 årene" og gå til steg 1
        utils.clickOptionThenNext(0); // Velg "Har vært i jobb" og gå til steg 2
        utils.clickOptionThenNext(4); // Velg "Høyere utdanning (1 til 4 år)" og gå til steg 3
        utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 4
        utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 5
        utils.clickOptionThenNext(0); // Velg "Ja" og gå til steg 6
    });
    utils.stdStegTest(skjemaVerdier[5]);
    it('Går videre til oppsummering ved klikk på NESTE', () => {
        cy.get('[class="alternativ-wrapper"]')
            .eq(0)
            .click();
        cy.get('[data-testid="neste"]')
            .should('have.attr', 'href', '/oppsummering')
            .click();
        cy.get('[class="typo-innholdstittel oppsummering-tittel"]')
            .should('contain', 'Er opplysningene riktige?');
    });
});