import { selectByTestId } from "../../helpers/selectByTestId";

export const addComment = (text: string) => {
  cy.getByTestId("AddCommentForm.Input").type("text");
  cy.getByTestId("AddCommentForm.Button").click();
};

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId));
};
declare global {
  namespace Cypress {
    interface Chainable {
      addComment(text: string): Chainable<void>;
    }
  }
}
