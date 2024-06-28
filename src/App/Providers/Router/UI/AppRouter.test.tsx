import { screen } from "@testing-library/react";
import { componentRender } from "@/Shared/lib/tests/componentRender/componentRender";
import AppRouter from "./AppRouter";
import {
  getRouteAbout,
  getRouteAdmin,
  getRouteProfile,
} from "@/Shared/const/router";

describe("App/Router/AppRouter", () => {
  test("Page should be rendered", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout(),
    });
    const page = await screen.findByTestId("AboutPage");
    expect(page).toBeInTheDocument();
  });
  test("Page not found", async () => {
    componentRender(<AppRouter />, {
      route: "/sdadda",
    });
    const page = await screen.findByTestId("NotFoundPage");
    expect(page).toBeInTheDocument();
  });
  test("Redirect", async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile("1"),
    });
    const page = await screen.findByTestId("MainPage");
    expect(page).toBeInTheDocument();
  });
  test("Доступ к закрыйтой странице авторизованного пользователя", async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile("1"),
      initialState: {
        applicationUser: {
          _inited: true,
          authData: {},
        },
      },
    });
    const page = await screen.findByTestId("ProfilePage");
    expect(page).toBeInTheDocument();
  });
  test("Доступ запрещен по роли", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        applicationUser: {
          _inited: true,
          authData: {},
        },
      },
    });
    const page = await screen.findByTestId("ForbiddenPage");
    expect(page).toBeInTheDocument();
  });
  test("Доступ разрешен по роли", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        applicationUser: {
          _inited: true,
          authData: { applicationUserId: "1" },
        },
      },
    });
    const page = await screen.findByTestId("AdminPanelPage");
    expect(page).toBeInTheDocument();
  });
});
