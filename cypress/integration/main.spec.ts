describe("Test App", () => {
	before(() => {
		cy.intercept("/authid?*", "1234");
		cy.intercept("/dsbtimetables?authid=1234", [
			{ Childs: [{ Detail: "https://test.com/" }] },
		]);
		cy.fixture("samples.json").then((data) => {
			cy.intercept("https://test.com/", data["timetable"]);
		});
	}),
		it("Test Login Page", () => {
			// Connect to the page to `/`
			cy.visit("http://localhost:8080");

			// Get the `Username/Id` field and type `MyUsername`
			cy.get('input[type="text"]')
				.click()
				.type("MyUsername");

			// Get the `Password` field and type `MyPassword`
			cy.get('input[type="password"]')
				.click()
				.type("MyPassword");

			// Get the `Log-in button` by its autofocus property and click it
			cy.get("[autofocus]");

			// Check wether the href has changed or not
			cy.location("href").should("not.contain", "login");
		});
});
