import { type ReactNode } from "react";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { ReducersMapObject } from "@reduxjs/toolkit";
import i18nForTests from "../../../Config/i18n/i18nForTests";
import { type StateSchema, StoreProvider } from "@/App/Providers/StoreProvider";
import { Theme } from "@/Shared/const/theme";
// eslint-disable-next-line avalserg-plugin/layer-imports
import { ThemeProvider } from "@/App/Providers/ThemeProvider";
// eslint-disable-next-line avalserg-plugin/layer-imports
import "@/App/Styles/index.scss";

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderProps {
  children: ReactNode;
  options?: componentRenderOptions;
}

export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props;
  const {
    route = "/",
    initialState,
    asyncReducers,
    theme = Theme.LIGHT,
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
