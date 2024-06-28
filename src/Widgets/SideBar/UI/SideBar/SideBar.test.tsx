import { fireEvent, screen } from "@testing-library/react";
import { SideBar } from "./SideBar";

import { componentRender } from "@/Shared/lib/tests/componentRender/componentRender";

describe("Sidebar", () => {
  test("SideBar render", () => {
    componentRender(<SideBar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
  test("Test toggle", () => {
    componentRender(<SideBar />);
    const toggleBtn = screen.getByTestId("sidebar-toggle");
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
  });
});
