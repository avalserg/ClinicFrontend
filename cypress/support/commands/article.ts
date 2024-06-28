import { Article } from "../../../src/Entities/Article";

const defaultArticle = {
  title: "TestingArticle",
  subtitle: "Whats new in Js 2003",
  img: "https://www.egovaleo.it/wp-content/uploads/2023/10/c-sharp-1024x576.png",
  views: 10342,
  createdAt: "26.12.2003",
  userId: "1",
  type: ["ECONOMICS"],
  blocks: [],
};
// article arg for spec data
export const createArticle = (article?: Article) => {
  return cy
    .request({
      method: "POST",
      url: `http://localhost:8000/articles`,
      headers: { Authorization: "sadasd" },
      body: article ?? defaultArticle,
    })
    .then((response) => response.body);
};
// prevent mutation data after test
export const removeArticle = (articleId: string) => {
  return cy.request({
    method: "DELETE",
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: "sadasd" },
  });
};
declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
