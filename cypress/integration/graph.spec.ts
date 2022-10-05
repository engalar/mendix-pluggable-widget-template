describe("empty spec", () => {
    const browserName = Cypress.browser.name;

    it("passes", () => {
        cy.visit("http://localhost:8080/index.html?profile=Responsive");

        cy.wait(2000);

        cy.get(".mx-name-grid1 .mx-grid-content tr.mx-name-index-0").click();

        cy.get(".mx-button").contains("Edit").click();

        cy.get(".mx-name-graph1").contains("hello and your value is").click();

        cy.get(".modal-content").compareSnapshot(`graph-${browserName}`, 1);
    });
});
