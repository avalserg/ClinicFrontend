import { USER_LOCALSTORAGE_KEY } from "../../../src/Shared/const/localStorage";
import { User } from "../../../src/Entities/User";
import { selectByTestId } from "../../helpers/selectByTestId";

export const login = (
  username: string = "testuser",
  password: string = "123",
) => {
  return cy
    .request({
      method: "POST",
      url: "http://localhost:8000/login",
      body: {
        grant_type: "password",
        username,
        password,
      },
    })
    .then(({ body }) => {
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));

      return body;
    });
};

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId));
};
declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<User>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
