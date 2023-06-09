import { render, waitFor, screen } from "@testing-library/react";
import Search from "./Search";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

describe("SearchPage", () => {
  const setTitle = jest.fn();
  const routes = [
    {
      path: "/search",
      element: <Search setTitle={setTitle} />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/search"],
  });

  beforeEach(() => {
    setTitle.mockReset();
  });

  it("should render", async () => {
    const { container } = render(<RouterProvider router={router} />);
    await waitFor(() => screen.getByText("Search"));
    expect(container).toMatchSnapshot();
    expect(setTitle).toBeCalledWith("Search");
  });

  it("should render with results", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/search?query=iphone"]}>
        <Search setTitle={setTitle} />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText("iPhone 9"));

    expect(container).toMatchSnapshot();
    expect(setTitle).toBeCalledWith("Search");
  });
});
