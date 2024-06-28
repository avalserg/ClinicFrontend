let profileId = "";

describe("Пользователь заходит на траницу профиля", () => {
  beforeEach(() => {
    cy.visit("profile");
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it("И профиль успешно загружается", () => {
    cy.getByTestId("ProfileCard.firstname").should("have.value", "test");
  });
  it("Редактирует его", () => {
    const newName = "new";
    const newLastName = "lastname";
    cy.updateProfile(newName, newLastName);
    cy.getByTestId("ProfileCard.firstname").should("have.value", newName);
    cy.getByTestId("ProfileCard.lastname").should("have.value", newLastName);
  });
});
