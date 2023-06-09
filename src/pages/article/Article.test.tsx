import { render, waitFor, screen } from "@testing-library/react";
import Article from "./Article";
import {
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
  createMemoryRouter,
} from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { appContainer } from "../../Composition/AppContainer";

describe("ArticlePage", () => {
  const setTitle = jest.fn();
  const routes = [
    {
      path: "/article/:id",
      element: <Article setTitle={setTitle} />,
    },
    {
      path: "*",
      element: <NotFound setTitle={setTitle} />,
    },
  ];

  beforeEach(() => {
    appContainer.snapshot();
    setTitle.mockReset();
  });

  afterEach(() => {
    appContainer.restore();
  });

  it("should render", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/article/16"],
    });

    const { container } = render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText("Hyaluronic Acid Serum"));
    expect(container).toMatchSnapshot();
    expect(setTitle).toBeCalledWith("Hyaluronic Acid Serum");
  });

  it("should navigate to not found on missing params", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/article"],
    });
    const { container } = render(<RouterProvider router={router} />);
    await waitFor(() => screen.getByText("Page not found"));
    expect(container).toMatchSnapshot();
    expect(setTitle).toBeCalledWith("Page not Found");
  });

  it("should navigate to not found on incorrect param", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/article/blorg"]}>
        <Routes>
          <Route
            path="/article/:id"
            element={<Article setTitle={setTitle} />}
          />

          <Route path="/*" element={<NotFound setTitle={setTitle} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Page not found"));
    expect(container).toMatchSnapshot();
    expect(setTitle).toBeCalledWith("Page not Found");
  });

  it("should navigate to not found on article not found", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/article/1092"]}>
        <Routes>
          <Route
            path="/article/:id"
            element={<Article setTitle={setTitle} />}
          />

          <Route path="/*" element={<NotFound setTitle={setTitle} />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText("Page not found"));
    expect(container).toMatchSnapshot();
    expect(setTitle).toBeCalledWith("Page not Found");
  });
});
