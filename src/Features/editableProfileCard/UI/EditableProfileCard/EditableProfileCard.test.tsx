import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { EditableProfileCard } from "./EditableProfileCard";
import { componentRender } from "@/Shared/lib/tests/componentRender/componentRender";
import { Profile } from "@/Entities/Profile";
import { Currency } from "@/Entities/Currency";
import { Country } from "@/Entities/Country";
import { profileReducer } from "../../Model/slice/profileSlice";
import { $api } from "@/Shared/API/api";

const profile: Profile = {
  applicationUserId: "1",
  first: "kkk",
  last: "kkk",
  age: 56,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: "Moscow",
  username: "alex",
};
const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    // for canEdit
    user: {
      authData: { id: "1", username: "alex" },
    },
  },
  // if reducer mounted in another component
  asyncReducers: {
    profile: profileReducer,
  },
};
describe("Features/EditableProfileCard", () => {
  test("Readonly change", async () => {
    componentRender(<EditableProfileCard id={"1"} />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton"),
    );
    expect(
      screen.getByTestId("EditableProfileCardHeader.CancelButton"),
    ).toBeInTheDocument();
  });
  test("After cancel reset values", async () => {
    componentRender(<EditableProfileCard id={"1"} />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton"),
    );
    // clear inputs
    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
    await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));
    // fill in inputs
    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.lastname"), "user");

    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("user");
    // click on cancel button
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.CancelButton"),
    );
    // inputs have initial values
    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("kkk");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("kkk");
  });
  test("Should get error", async () => {
    componentRender(<EditableProfileCard id={"1"} />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton"),
    );
    // clear inputs
    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));

    // click on cancel button
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton"),
    );

    // error appears in dom
    expect(
      screen.getByTestId("EditableProfileCard.Error.Paragraph"),
    ).toBeInTheDocument();
  });
  test("If we doesnt have errors -> put to server", async () => {
    // mock from updateprofileData after correct validation
    const mockPutRequest = jest.spyOn($api, "put");
    componentRender(<EditableProfileCard id={"1"} />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton"),
    );
    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");

    // click on cancel button
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton"),
    );
    expect(mockPutRequest).toHaveBeenCalled();
  });
});
