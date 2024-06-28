let currentArticleId = "";

describe("Пользователь заходит на страницу статьи", () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      // save id
      currentArticleId = article.id;
      cy.log(JSON.stringify(article));
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  // create after testing delete
  it("и видит содержимое статьи", () => {
    cy.getByTestId("ArticleDetails.Info").should("exist");
  });
  it("и видит список реккомендаций", () => {
    cy.getByTestId("ArticleRecommendationList").should("exist");
  });
  it("и оставляет комментрарий", () => {
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("AddCommentForm").scrollIntoView();
    cy.addComment("text");
    cy.getByTestId("CommentCard.Content").should("have.length", 1);
  });
  it("и ставит оценку", () => {
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("RatingCard").scrollIntoView();
    cy.setRate(5, "feedback");
    cy.get("[data-selected=true]").should("have.length", 5);
  });
  it("и ставит оценку со стабом на фикстурах", () => {
    cy.intercept("GET", "**/articles/*", { fixture: "article-details.json" });
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("RatingCard").scrollIntoView();
    cy.setRate(5, "feedback");
    cy.get("[data-selected=true]").should("have.length", 5);
  });
});
