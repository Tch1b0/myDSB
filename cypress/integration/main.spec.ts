describe("Test App", () => {
    beforeEach(() => {
        cy.intercept("/authid?*", "1234");
        cy.intercept("/dsbtimetables?authid=1234", [
            { Childs: [{ Detail: "https://test.com/" }] },
        ]);
        cy.fixture("samples.json").then((data) => {
            cy.intercept("https://test.com/", data["timetable"]);
        });
    });

    it("Test Login Page", () => {
        // Connect to the page to `/`
        cy.visit("/");

        // Get the `Username/Id` field and type `MyUsername`
        cy.get('input[type="text"]').type("MyUsername");

        // Get the `Password` field and type `MyPassword`
        cy.get('input[type="password"]').type("MyPassword");

        // Get the `Log-in button` by its autofocus property and click it
        cy.get("[autofocus]").click();

        // Check wether the href has changed or not
        cy.get("ion-tab-bar");
    });

    it("Test Home Page", () => {
        cy.visit("/home");

        cy.wait(1000);

        cy.get("ion-card");

        cy.get("ion-tab-bar");
    });

    it("Test Settings Page and log out", () => {
        cy.visit("/home");

        cy.wait(1000);

        cy.get("#tab-button-settings").click();

        cy.url().should("contain", "/settings");

        cy.get('ion-button[color="danger"]').click();
    });
});
