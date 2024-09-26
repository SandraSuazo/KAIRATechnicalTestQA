describe("Form", () => {
  beforeEach(() => {
    cy.visit("https://form.jotform.com/242662208509356");
  });

  it("Registration form validation", () => {
    // Verifies the welcome message and adds a first and last name
    cy.get("#cid_1").should("contain.text", "¡Bienvenido!").and("contain.text", "Completa tus datos de registro");
    cy.get("#id_3").should("contain.text", "Nombre");
    cy.get("#first_3").type("Name");
    cy.get("#last_3").type("Last name");
    // Verifies email format errors and then adds a valid email
    cy.get("#id_4").should("contain.text", "Email");
    cy.get("#input_4").type("email").blur();
    cy.get(".form-error-message").should("be.visible").and("contain.text", "Introduzca una dirección e-mail válida");
    cy.get("#input_4").clear().type("email@test").blur();
    cy.get(".form-error-message").should("be.visible").and("contain.text", "Introduzca una dirección e-mail válida");
    cy.get("#input_4").clear().type("email@test.com").blur();
    cy.get(".form-error-message").should("not.exist");
    // Adds a birthdate
    cy.get("#id_6").should("contain.text", "Fecha de nacimiento");
    cy.get("#lite_mode_6").type("03101990");
    // Changes the selected language to English
    cy.get("#id_7").should("contain.text", "Idioma");
    cy.get("#input_7").should("have.value", "es");
    cy.get("#customFieldFrame_7").then($iframe => {
      const iframeBody = cy.wrap($iframe.contents().find("body"));
      iframeBody.find("select").select("English");
    });
    cy.get("#input_7").should("have.value", "en");
    // Verifies that the column table is visible
    cy.get("#id_8").should("contain.text", "Verifica si todas las columnas son correctas");
    cy.get("#customFieldFrame_8").should("be.visible");
    // Selects "En la TV" as the answer to how you found out about us
    cy.get("#id_9").should("contain.text", "¿Cómo nos has conocido?");
    cy.get("#customFieldFrame_9").then($iframe => {
      const iframeBody = cy.wrap($iframe.contents().find("body"));
      iframeBody.find("#dropdown").click();
      iframeBody.find("span[data-value='En la TV']").click();
    });
    cy.get("#input_9").should("have.value", "En la TV");
    // Adds a three-star rating
    cy.get("#id_15").should("contain.text", "¿Qué opinas de nosotros?");
    cy.get("div[aria-label='3 out of 5']").should("have.attr", "aria-checked", "false").click().should("have.attr", "aria-checked", "true");
    // Submits the form and verifies that the URL changed correctly
    cy.get("#input_2").should("contain.text", "Confirmar").click();
    cy.url().should("eq", "https://eu-submit.jotform.com/242662208509356");
  });

  it("Table pagination, filtering and sorting functionality", () => {
    cy.get("#customFieldFrame_8").then($iframe => {
      const iframeBody = $iframe.contents().find("body");
      // Verify the initial pagination
      cy.wrap(iframeBody).find("#BootstrapDable_header").find("select").should("have.value", 10);
      cy.wrap(iframeBody).find("#BootstrapDable_body tr").should("have.length", 10);
      cy.wrap(iframeBody).find("#BootstrapDable_showing").should("contain.text", "Showing 1 to 10 of 13 entries");
      // Go to the next page
      cy.wrap(iframeBody).find("#BootstrapDable_page_next").click();
      cy.wrap(iframeBody).find("#BootstrapDable_body tr").should("have.length", 3);
      cy.wrap(iframeBody).find("#BootstrapDable_showing").should("contain.text", "Showing 11 to 13 of 13 entries");
      // Change the number of items to 25
      cy.wrap(iframeBody).find("#BootstrapDable_header").find("select").select("25");
      cy.wrap(iframeBody).find("#BootstrapDable_body tr").should("have.length", 13);
      cy.wrap(iframeBody).find("#BootstrapDable_showing").should("contain.text", "Showing 1 to 13 of 13 entries");
      // Make a search
      cy.wrap(iframeBody).find("#BootstrapDable_search").type("zaragoza");
      cy.wrap(iframeBody).find("#BootstrapDable_body tr").should("have.length", 3);
      cy.wrap(iframeBody).find("#BootstrapDable_showing").should("contain.text", "Showing 1 to 3 of 3 entries (filtered from 13 total entries)");
      cy.wrap(iframeBody).find("#BootstrapDable_search").clear();
      cy.wrap(iframeBody).find("#BootstrapDable_body tr").should("have.length", 13);
      cy.wrap(iframeBody).find("#BootstrapDable_showing").should("contain.text", "Showing 1 to 13 of 13 entries");
      // Verify the order of the items
      cy.wrap(iframeBody).find("#BootstrapDable_body tr").first().find("td").eq(1).should("contain.text", "Viena");
      cy.wrap(iframeBody).find("th[data-tag='Provincia']").click();
      cy.wrap(iframeBody).find("#BootstrapDable_body tr").first().find("td").eq(1).should("contain.text", "Lisboa");
    });
  });
});