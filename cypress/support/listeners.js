Cypress.on('window:before:load', win => {
    // Lar oss sjekke om vi kjører i en cypress-test fra appen.
    // Det er viktig å ikke bruke denne til mer enn absolutt nødvendig,
    // for å forhindre potensielt problematiske forskjeller mellom test og ikke-test.
    win.isCypressTest = true
});
