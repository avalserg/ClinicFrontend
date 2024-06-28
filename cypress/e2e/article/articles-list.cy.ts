describe("Пользователь заходит на страницу со списком статей", () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit("articles");
    });
  });
  it("и статьи успешно подгружаются", () => {
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
  });
  // стаб синоним мок фейковые заранее подготовленные данные
  it("на стабах (фикстурах)", () => {
    cy.intercept("GET", "**/articles?*", { fixture: "articles.json" });
    // cy.intercept("GET", "**/articles?*", (req)=>{
    //   req.
    // });
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
  });
  it.skip("Заскипанный тест", () => {
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    cy.get("aasass").should("exist");
  });
});
