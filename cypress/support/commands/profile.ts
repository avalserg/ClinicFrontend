export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId("EditableProfileCardHeader.EditButton").click();
  cy.getByTestId("ProfileCard.firstname").clear().type(firstname);
  cy.getByTestId("ProfileCard.lastname").clear().type(lastname);
  cy.getByTestId("EditableProfileCardHeader.SaveButton").click();
};
// prevent mutation data after test
export const resetProfile = (profileId: string) => {
  return cy.request({
    method: "PUT",
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: "sadasd" },
    body: {
      id: "4",
      first: "test",
      last: "User",
      age: 36123,
      currency: "USD",
      country: "Ukraine",
      city: "Orsha123",
      username: "avas",
      avatar:
        "https://ichef.bbci.co.uk/news/640/cpsprodpb/6969/production/_93558962_istock-586160412.jpg",
    },
  });
};
declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
