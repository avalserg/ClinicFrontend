import { Dispatch } from "react";
import { TestAsyncThunk } from "@/Shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { loginByUsername } from "./loginByUsername";
import { userActions } from "@/Entities/ApplicationUser";
import { Role } from "@/Entities/Role";
import { StateSchema } from "@/App/Providers/StoreProvider";

describe("loginByUsername.test", () => {
 
  test("success login", async () => {
    const userValue = { username: "123", id: "1", role: Role.ADMIN };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk({
      login: "123",
      password: "123",
      // role: Role.ADMIN,
    });

    // expect(thunk.dispatch).toHaveBeenCalledWith(
    //   userActions.setAuthData(userValue),
    // );
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login", async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({
      login: "123",
      password: "123",
      // role: Role.ADMIN,
    });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
