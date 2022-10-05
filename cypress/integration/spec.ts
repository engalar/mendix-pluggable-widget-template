describe("empty spec", () => {
    const browserName = Cypress.browser.name;

    it("passes", () => {
        cy.visit("https://example.cypress.io");

        cy.wait(2000);
        cy.get(".navbar").compareSnapshot(`navbar-${browserName}`, 1);
    });
});
